export interface Album {
    id: number;
    title: string;
    artist: string;
    artwork: string;
    length: string;
    listened: boolean;
    year: number;
}

export interface Decades {
    decade: string;
}