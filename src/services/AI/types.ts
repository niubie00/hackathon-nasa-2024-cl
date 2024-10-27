export interface IModelOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  streaming?: boolean;
  verbose?: boolean;
}

export interface IChatCall {
  prompt: string;
  system?: string;
  schema?: any;
  context?: string;
  model: IModelOptions;
  inputVariables?: IChatValues[];
}

export interface IChatValues {
  key: string;
  value: string;
}
