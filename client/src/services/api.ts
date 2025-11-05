import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Albums"],
  endpoints: (builder) => ({
    getAlbums: builder.query<any, void>({
      query: () => "/albums",
      transformResponse: (response: any) => {
        return response[0].data;
      },
      providesTags: ["Albums"],
    }),
    getDecades: builder.query<any, void>({
      query: () => "/albums/decades",
    }),
    getAlbumsByDecade: builder.query<any[], string>({
      query: (decade) => `/albums/decade/${decade}`,
      providesTags: ["Albums"],
    }),
    toggleAlbumListened: builder.mutation<{ message: string }, number>({
      query: (albumId) => ({
        url: `/albums/listened/${albumId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Albums"],
    }),
  })
});

export const {
  useGetAlbumsQuery,
  useGetDecadesQuery,
  useGetAlbumsByDecadeQuery,
  useToggleAlbumListenedMutation
} = api;
