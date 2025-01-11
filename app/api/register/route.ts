import { User } from "@/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
// import { sendEmail } from "@/utils/sendEmail";
import sgMail from '@sendgrid/mail'
import { verificationEmailTemplate } from "@/utils/verificationEmailTemplate";
import { Source_Code_Pro } from "next/font/google";

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL as string);
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const isUserExist = await User.findOne({ name: name });

    if (isUserExist) {
        return Response.json({
            success: false,
            message: "User name already exists",
        })
    }

    const isEmailExist = await User.findOne({ email: email });

    if (isEmailExist) {
        return Response.json({
            success: false,
            message: "Email already exists",
        })
    }

    const user = await User.create({
        name,
        email,
        hashedPassword
    })


    const verificationToken = user.getVerificationToken();
    await user.save();
    console.log(verificationToken);

    const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?verifyToken=${verificationToken}&id=${user._id}`

    console.log(verificationLink)

    // await sendEmail(user?.email, "Email Verification", verificationLink);

    const message = verificationEmailTemplate(verificationLink);
    console.log(message)
    
    // Click here to verify your email: ${verificationLink}
        const msg = {
                        to : user?.email,
                        from: 'amroalmutasim22@gmail.com',
                        subject: "Email Verification",
                        html: message,
                    }
            
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
            
                    sgMail
                    .send(msg)
                    .then(() => {
                        return Response.json({
                            success: true,
                            message: "Verification email was sent",
                        });
                    })
                    .catch(async (error) => {
                        await User.updateOne({ email: email }, { $set: {
                            verifyToken: null,
                            verifyTokenExpires: null,
                        }})
                        
                        console.log(error)

                        return Response.json({
                            success: false,
                            message: "Failed sending email. Try again",
                        });
                    });
    

    return Response.json({
        success: true,
    })

}