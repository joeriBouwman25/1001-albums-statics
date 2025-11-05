import {AlbumCard} from "../albumCard/AlbumCard";
import {Album} from "../../services/types";
import './albumList.css'

export const AlbumList = ({ albums }: {albums: Album[]}) => {

  return (
    <section>
      {albums.map((album: Album) => (
          <AlbumCard key={album.id} album={album} />
      ))}
    </section>
  );
};
