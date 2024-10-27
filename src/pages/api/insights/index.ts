import { NextApiRequest, NextApiResponse } from "next";
import requestHandler from "@/pages/_requestHandler";
import AI from "@/services/AI";
import { IChatCall } from "@/services/AI/types";
import { insightSchema } from "@/services/AI/schemas";

const handler = requestHandler().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { results, lesson } = req.body;

      const options: IChatCall = {
        model: {
          temperature: 0.5,
        },
        inputVariables: [
          {
            key: "lesson",
            value: JSON.stringify(lesson),
          },
          {
            key: "results",
            value: JSON.stringify(results),
          },
        ],
        schema: insightSchema,
        system: "Eres un experto en medioambiente, ecología y sostenibilidad.",
        prompt: `
          Dada la siguiente lección:
          {lesson}

          El usuario obtuve los siguientes resultados:
          {results}

          Considera el score en los challenges representan una cantidad de co2 que podría reducirse en la vida real.
          Y considera que el score en los resultados es la cantidad de co2 que el usuario logró reducir.
        `,
      };

      const insights = await AI.callCompletion(options);
      return res.status(200).json(insights);
    } catch (error: any) {
      console.error(error);
      return res.status(error.response.status).json(error.response.data);
    }
  }
);

export default handler;
