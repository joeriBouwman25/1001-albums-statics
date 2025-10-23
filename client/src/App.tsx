import { AlbumList } from "./components/AlbumList";
import { useGetAlbumsQuery } from "./services/api";

export const App = () => {
  const { data, isLoading } = useGetAlbumsQuery();
  if (isLoading) return <h1>Laden...</h1>;

  const albums = data?.flatMap((item) => item.albums);
  return (
    <>
      <h1>1001 Albums Statics</h1>
      <AlbumList albums={albums} />
    </>
  );
};
