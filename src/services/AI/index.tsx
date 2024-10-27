import { ChatOpenAI, ClientOptions } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

import { IChatCall, IChatValues } from "./types";

class AI {
  fields: any;
  config: ClientOptions;

  constructor() {
    this.config = {
      apiKey: process.env.OPENAI_ACCESS_TOKEN,
      organization: process.env.OPENAI_ORGANIZATION_ID,
    };

    this.fields = {
      modelName: "gpt-4o-mini",
      openAIApiKey: this.config.apiKey as string,
    };
  }

  async callStringCompletion(prompt: string) {
    try {
      const chain = new ChatOpenAI({
        ...this.fields,
        ...this.config,
      });

      return chain.invoke(prompt);
    } catch (error) {
      console.error(error);
    }
  }

  async callCompletion(chatOptions: IChatCall) {
    try {
      const chain = this.buildTemplate(chatOptions)
        .pipe(this.buildLLM(chatOptions))
        .pipe(new JsonOutputFunctionsParser() as any);

      const inputVariables = this.buildInputVariables(
        chatOptions.inputVariables as IChatValues[]
      );

      return chain.invoke(inputVariables);
    } catch (error) {
      console.error(error);
    }
  }

  private buildTemplate({ prompt, system }: IChatCall) {
    return ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(system as string),
      HumanMessagePromptTemplate.fromTemplate(prompt),
    ]);
  }

  private buildLLM(chatOptions: IChatCall) {
    const llm = new ChatOpenAI({
      ...this.fields,
      ...this.config,
      ...chatOptions.model,
    });

    if (chatOptions.schema) {
      return llm.bind({
        functions: [chatOptions.schema],
        function_call: { name: chatOptions.schema.name },
      });
    }

    return llm;
  }

  private buildInputVariables(inputVariables: IChatValues[]) {
    return inputVariables.reduce(
      (acc, variable) => ({ ...acc, [variable.key]: variable.value }),
      {}
    );
  }
}

export default new AI();
