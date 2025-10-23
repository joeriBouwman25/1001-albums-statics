import { useGetAlbumsQuery } from "../services/api";

export const AlbumList = () => {
  const { data, isLoading } = useGetAlbumsQuery();
  console.log(data);

  return isLoading ? <h1>Laden...</h1> : <div>hoi</div>;
};
