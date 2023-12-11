import { BASE_URL, REFRESH_TOKEN } from "../utils/urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Toast from "react-native-simple-toast";

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState, store } from "../store";
import { CustomError } from "../Models/ServiceModels/AuthModel";

const NetworkError = {
  error: {
    status: 408,
    statusText: "Bad Request",
    data: {
      code: 408,
      status: "Network Error",
      message: "Please check your internet connectivity",
    },
  },
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    headers.set("cache-control", "no-cache");

    const token = store.getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | CustomError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("Result with Network request", result?.error?.status);

  return result;
};

export const api = createApi({
  tagTypes: [],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
