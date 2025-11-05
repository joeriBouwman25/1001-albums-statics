import {Album} from "../../services/types";
import './albumCard.css'
import {useToggleAlbumListenedMutation} from "../../services/api";

export const AlbumCard = ({ album }: { album: Album }) => {
    const [toggleAlbumListened, { isLoading }] = useToggleAlbumListenedMutation();

    const handleToggleListened = async () => {
        try {
            await toggleAlbumListened(album.id).unwrap();
            // The query will be refetched automatically due to invalidatesTags
        } catch (error) {
            console.error('Failed to toggle listened status', error);
        }
    };
    return (
        <article>
            <img src={album.artwork} alt={`${album.title} cover`}/>
            <h3>{album.title}</h3>
            <p>{album.artist}</p>
            <p>{album.length}</p>
            <p>{album.year}</p>
            <button data-listened={album.listened} onClick={handleToggleListened} disabled={isLoading}>
                {isLoading ? 'Updating...' : album.listened ? "Beluisterd" : "Niet Beluisterd"}
            </button>
        </article>
    );
}
