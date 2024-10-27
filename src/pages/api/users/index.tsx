import prisma from "@/lib/prisma";
import requestHandler from "@/pages/_requestHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = requestHandler()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { email } = req.query;
      const user = await prisma.user.findUnique({
        where: {
          email: email as string,
        },
      });

      if (!user) return res.status(404).json({ error: "User not found" });

      return res.status(200).json(user);
    } catch (error: any) {
      console.error(error);
      return res.status(error.response.status).json(error.response.data);
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (user) return res.status(200).json(user);

      const storedUser = await prisma.user.create({
        data: req.body,
      });

      return res.status(200).json(storedUser);
    } catch (error: any) {
      console.error(error);
      return res.status(error.response.status).json(error.response.data);
    }
  });

export default handler;
