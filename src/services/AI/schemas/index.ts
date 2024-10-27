import zodToJsonSchema from "zod-to-json-schema";
import exampleParams from "./example";
import insightParams from "./insights";

export const exampleSchema = {
  name: "example_schema",
  parameters: zodToJsonSchema(exampleParams),
};

export const insightSchema = {
  name: "insight_schema",
  parameters: zodToJsonSchema(insightParams),
};
