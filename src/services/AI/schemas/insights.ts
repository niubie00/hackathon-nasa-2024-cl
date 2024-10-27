import { z } from "zod";

const insightParams = z.object({
  insights: z
    .array(
      z
        .string()
        .min(300)
        .describe(
          "Insight breve, de no más de 300 caracteres y dirigido al estudiante, que explique el impacto de la calificación del estudiante respecto a la lección."
        )
    )
    .min(3)
    .describe("Listado de insigths"),
});

export default insightParams;
