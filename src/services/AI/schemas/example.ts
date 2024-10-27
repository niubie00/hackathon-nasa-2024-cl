import { z } from "zod";

const exampleParams = z.object({
  result: z
    .array(
      z
        .string()
        .min(300)
        .describe(
          "Insigth sobre la calidad del agua en Chile con respecto a la temperatura del agua."
        )
      // z.object({
      //   ID: z.number().describe("ID numérico del contenido"),
      //   text: z
      //     .string()
      //     .min(300)
      //     .describe(
      //       "Párrafo educativo de al menos 300 caracteres que desarrolla en profundidad e ilustra con ejemplos los contenidos de esta lección."
      //     ),
      // })
    )
    .min(3)
    .describe(
      "Listado de insigths sobre la calidad del agua en Chile con respecto a la temperatura del agua."
    ),
});

export default exampleParams;
