import prisma from "@/lib/prisma";
import requestHandler from "@/pages/_requestHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = requestHandler()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { userId } = req.query;
      const lesson = await prisma.lessonSession.findMany({
        where: {
          userId: userId as string,
        },
      });

      if (!lesson) return res.status(404).json({ error: "Lesson not found" });

      return res.status(200).json(lesson);
    } catch (error: any) {
      console.error(error);
      return res.status(error.response.status).json(error.response.data);
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const lesson = await prisma.lessonSession.create({
        data: req.body,
      });

      return res.status(200).json(lesson);
    } catch (error: any) {
      console.error(error);
      return res.status(error.response.status).json(error.response.data);
    }
  });

export default handler;
