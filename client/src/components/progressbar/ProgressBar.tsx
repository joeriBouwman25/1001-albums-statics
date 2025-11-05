import './progressbar.css';
import {Album} from '../../services/types';

interface ProgressBarProps {
    albums: Album[] | undefined;
}

export const ProgressBar = ({ albums }: ProgressBarProps) => {
    if (!albums || albums.length === 0) {
        return null;
    }

    const listenedCount = albums.filter(album => album.listened).length;
    const totalCount = albums.length;
    const percentage = Math.round((listenedCount / totalCount) * 100);

    return (
        <div>
            <div>
                <span>{percentage}% van de albums geluisterd ({listenedCount}/{totalCount})</span>
            </div>
            <div>
                <div style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};
