import { useRouter } from "next/router";
import useSWR from "swr";

import { IFetcherConfig } from "./types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const cache: Record<string, any> = {};
const cacheExpiry: Record<string, number> = {};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function axiosWithCache(url: string, options: AxiosRequestConfig<any>) {
  if (options.method && options.method !== "GET") {
    return axios(url, options).then((response: AxiosResponse) => response.data);
  }

  const now = new Date().getTime();

  if (cache[url] && cacheExpiry[url] > now) {
    console.log("Serving from cache:", url);
    return cache[url];
  }

  try {
    const response = await axios(url, options);
    cache[url] = response.data;
    cacheExpiry[url] = now + CACHE_DURATION;

    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}

export function useRequester(
  urls: string | string[],
  options: AxiosRequestConfig = {},
  cache = false
): Promise<any> {
  const fetcher = (url: string): Promise<unknown> => {
    if (cache) {
      return axiosWithCache(`/api${url}`, {
        ...options,
        timeout: 90000,
      });
    }

    return axios(`/api${url}`, { ...options, timeout: 90000 }).then(
      (res: AxiosResponse) => res.data
    );
  };

  if (Array.isArray(urls)) {
    if (urls.length > 1) return Promise.all(urls.map(fetcher));

    return fetcher(urls[0]);
  }

  return fetcher(urls);
}

export function useFetcher<T = any>(
  urls: string | string[],
  config: IFetcherConfig = {}
) {
  const {
    waitRouterReady = false,
    waitFor = true,
    cache = false,
    ...fetchConfig
  } = config;

  const router = useRouter();
  const requester = useRequester;

  const { data, mutate, error } = useSWR<T>(
    waitFor && (!waitRouterReady || router.isReady) ? urls : null,
    (...urls) => requester(urls[0], {}, cache),
    fetchConfig
  );

  return {
    data,
    mutate,
    isError: !!error,
    isLoading: !data || !!error,
  };
}

export default useFetcher;
