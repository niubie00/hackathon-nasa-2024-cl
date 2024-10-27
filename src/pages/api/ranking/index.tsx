import { groupBy as _groupBy } from "lodash";
import prisma from "@/lib/prisma";
import requestHandler from "@/pages/_requestHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = requestHandler().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const users = await prisma.user.findMany({
        where: {},
        include: {
          sessions: true,
        },
      });

      const ranking = users.reduce((acc: any, user: any) => {
        const filteredSessions = Object.values(
          user.sessions.reduce((acc: any, session: any) => {
            const { lessonId, score } = session;
            if (!acc[lessonId] || score > acc[lessonId].score) {
              acc[lessonId] = session;
            }
            return acc;
          }, {})
        );

        const totalScore = filteredSessions.reduce(
          (acc: any, session: any) => acc + session.score,
          0
        );

        return [...acc, { ...user, score: totalScore }];
      }, []);

      const orderedRanking = ranking.sort(
        (a: any, b: any) => b.score - a.score
      );

      return res.status(200).json(orderedRanking);
    } catch (error: any) {
      console.error(error);
      return res.status(error.response.status).json(error.response.data);
    }
  }
);

export default handler;
