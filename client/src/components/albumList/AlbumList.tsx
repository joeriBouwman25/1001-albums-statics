import {AlbumCard} from "../albumCard/AlbumCard";
import {Album} from "../../services/types";
import './albumList.css'
import {useEffect, useRef} from "react";

export const AlbumList = ({ albums }: {albums: Album[]}) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if(sectionRef.current) {
      sectionRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }, [albums]);

  return (
    <section ref={sectionRef}>
      {albums.map((album: Album) => (
          <AlbumCard key={album.id} album={album} />
      ))}
    </section>
  );
};
