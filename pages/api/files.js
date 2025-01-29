import { connectToDatabase } from "../../utils/db";
import { getSession } from "@/actions/getUser";
import { getServerSession } from 'next-auth';
import File from "../../models/files";
import { authOptions } from '../api/auth/[...nextauth]';

export default async function handler(req, res) {
  try {

    await connectToDatabase();
    const session = await getServerSession(req, res, authOptions);
    console.log(session.user.email);

    if (!session) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
        })
    }


    if (req.method === "GET") {
        const files = await File.find({})
        return res.status(200).json({
            success: true,
            data: files,
        })
    }

    res.setHeader("Allow", ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`)


  } catch (error) {
    console.error('Error in handler', error);
    res.status(500).json({
        success: false,
        message: "Internal Server Error", 
        error: error.message
    })
  }
}
