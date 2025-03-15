import Box from '@mui/material/Box';
import ArtistChip from './ArtistChip';

interface ArtistChipContainerProps {
    artists: string[];
    selectedArtists: string[];
    onArtistClick: (artist: string) => void;
}

export default function ArtistChipContainer({ artists, selectedArtists, onArtistClick }: ArtistChipContainerProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                padding: 2,
                justifyContent: 'center'
            }}
        >
            {artists.map((artist, index) => (
                <ArtistChip
                    key={`${artist}-${index}`}
                    artist={artist}
                    isSelected={selectedArtists.includes(artist)}
                    onClick={() => onArtistClick(artist)}
                />
            ))}
        </Box>
    );
} 