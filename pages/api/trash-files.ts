import { connectToDatabase } from "../../utils/db";
import { getSession } from "@/actions/getUser";
import { getServerSession } from 'next-auth';
import File from "../../models/files";
import { authOptions } from './auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    
    await connectToDatabase();
    const session = await getServerSession(req, res, authOptions);
    console.log(session?.user?.email);

    
    const { searchTerm, email } = await req.query;
    console.log(searchTerm, email);

    if (!session) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
        })
    }

    let searchString = searchTerm; 

    if (!searchTerm) {
        searchString = "";
    }


    if (req.method === "GET") {
       const favFiles = await File.find({
        isTrash: true,
        title: { $regex: searchString, $options: "i" },
        emailRef: { $in: email },
          })
          .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: favFiles,
        })
    }

    res.setHeader("Allow", ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`)


  } catch (error: any) {
    console.error('Error in handler', error);
    res.status(500).json({
        success: false,
        message: "Internal Server Error", 
        error: error.message
    })
  }
}
