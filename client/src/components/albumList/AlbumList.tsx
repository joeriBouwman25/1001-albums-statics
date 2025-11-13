import {AlbumCard} from "../albumCard/AlbumCard";
import {Album} from "../../services/types";
import './albumList.css'
import {useEffect, useRef} from "react";

export const AlbumList = ({ albums }: {albums: Album[]}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(scrollRef.current) {
      scrollRef.current.scrollIntoView({behavior: 'smooth', block: 'end'})
    }
  }, [albums]);

  return (
      <>
        <div ref={scrollRef}/>
          <section>
          {albums.map((album: Album) => (
              <AlbumCard key={album.id} album={album} />
          ))}
        </section>
      </>
  );
};
