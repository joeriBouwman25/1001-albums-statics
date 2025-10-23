import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAlbums: builder.query<any, void>({
      query: () => "/albums",
      transformResponse: (response: any) => {
        return response[0].data;
      }
    })
  })
});

export const { useGetAlbumsQuery } = api;
