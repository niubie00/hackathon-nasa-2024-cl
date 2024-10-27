import prisma from "@/lib/prisma";
import requestHandler from "@/pages/_requestHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = requestHandler().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id, userId } = req.query;
      const course = await prisma.course.findFirst({
        where: {
          id: id as string,
        },
        include: {
          lessons: {
            include: {
              sessions: {
                where: {
                  userId: userId as string,
                },
              },
            },
          },
        },
      });

      if (!course) return res.status(404).json({ error: "Course not found" });

      return res.status(200).json(course);
    } catch (error: any) {
      console.error(error);
      return res.status(error.response.status).json(error.response.data);
    }
  }
);

export default handler;
