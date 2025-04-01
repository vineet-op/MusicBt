export interface Song {
    id: number;
    title: string;
    artist: string;
    album?: string;
    coverImage?: string;
}

export interface User {
    id: number;
    name: string;
}