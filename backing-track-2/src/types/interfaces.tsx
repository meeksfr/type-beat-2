export interface Beat {
    url: string;
    id?: string;
    title?: string;
    keyCenter?: string;
    modality?: string;
    bpm?: number;
    thumbnailUrl?: string;
}

export interface Playlist {
    id: string;
    name: string;
    images: Array<{
        url: string;
        height?: number;
        width?: number;
    }>;
    owner: {
        display_name: string;
        id: string;
    };
    tracks: {
        total: number;
    };
}