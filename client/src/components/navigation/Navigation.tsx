import './navigation.css';
import {useGetAlbumsQuery, useGetDecadesQuery} from "../../services/api";
import {Album, Decades} from "../../services/types";

interface NavigationProps {
    onClick: (decade: string) => void;
    onRandomAlbum?: (album: Album) => void;
}

export const Navigation = ({onClick, onRandomAlbum}: NavigationProps) => {
    const { data } = useGetDecadesQuery();
    const { data: albums } = useGetAlbumsQuery();
    if(!data) return null;

    const decades: string[] = data.map((decade: Decades) => decade?.decade);

    const handleRandomAlbum = () => {
        if (albums && albums.length > 0 && onRandomAlbum) {
            const flattenedAlbums = albums.flatMap((item: any) => item.albums);
            const randomIndex = Math.floor(Math.random() * flattenedAlbums.length);
            const randomAlbum = flattenedAlbums[randomIndex];
            onRandomAlbum(randomAlbum);
        }
    };

    return (
        <nav>
            <ul>
                <li key="all">
                    <button onClick={() => onClick('all')}>All</button>
                </li>
                {decades.map(decade => (
                    <li key={decade}>
                        <button onClick={() => onClick(decade)}>{decade}</button>
                    </li>
                ))}
                <li>
                    <button onClick={handleRandomAlbum} disabled={!albums || albums.length === 0}>
                        🎲 Random Album
                    </button>
                </li>
            </ul>
        </nav>
    )
}