import { SWRConfiguration } from "swr";

export interface IFetcherConfig extends SWRConfiguration {
  waitRouterReady?: boolean;
  waitFor?: boolean;
  cache?: boolean;
}
