import {AlbumCard} from "../albumCard/AlbumCard";
import {Album} from "../../services/types";
import './albumList.css'

export const AlbumList = ({ albums }: {albums: Album[]}) => {

  return (
    <section>
      {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
      ))}
    </section>
  );
};
