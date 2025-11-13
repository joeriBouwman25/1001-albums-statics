import {AlbumList} from "./components/albumList/AlbumList";
import {AlbumCard} from "./components/albumCard/AlbumCard";
import {useGetAlbumsByDecadeQuery, useGetAlbumsQuery} from "./services/api";
import './app.css'
import {Navigation} from "./components/navigation/Navigation";
import {useState} from "react";
import {ProgressBar} from "./components/progressbar/ProgressBar";
import {Modal} from "./components/modal/Modal";
import {Album} from "./services/types";
import {LoadingState} from "./components/loadingState/LoadingState";

export const App = () => {
  const [selectedDecade, setSelectedDecade] = useState<string>("all");
  const [randomAlbum, setRandomAlbum] = useState<Album | null>(null);

  const { data, isLoading } = useGetAlbumsQuery();
  const { data: albumsByDecade } = useGetAlbumsByDecadeQuery(selectedDecade);

  if (isLoading) return <LoadingState />

  const albums = data?.flatMap((item: any) => item.albums);

  const handleClick = (decade: string) => {
    setSelectedDecade(decade)
    setRandomAlbum(null);
  }

  const handleRandomAlbum = (album: Album) => {
    setRandomAlbum(album);
    setSelectedDecade("all");
  }

  return (
    <>
      <div className="futuristic-orbs">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>
      <div className="app-layout">
        <Navigation onClick={(decade) => handleClick(decade)} onRandomAlbum={handleRandomAlbum}/>
        <main>
          <h1>1001 Albums Statistieken</h1>
          <ProgressBar albums={selectedDecade === 'all' ? albums : albumsByDecade} />
          {randomAlbum && (
            <Modal
              isOpen={!!randomAlbum}
              onClose={() => setRandomAlbum(null)}
              title="🎶 Veel luister plezier"
              closeButtonText="Sluiten"
            >
              <AlbumCard album={randomAlbum} />
            </Modal>
          )}
          <AlbumList albums={selectedDecade === 'all' ? albums : albumsByDecade} selectedDecade={selectedDecade} />
        </main>
      </div>
    </>
  );
};
