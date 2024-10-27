import prisma from "@/lib/prisma";
import requestHandler from "@/pages/_requestHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = requestHandler().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const courses = await prisma.course.findMany({});

      return res.status(200).json(courses);
    } catch (error: any) {
      console.error(error);
      return res.status(error.response.status).json(error.response.data);
    }
  }
);

export default handler;
