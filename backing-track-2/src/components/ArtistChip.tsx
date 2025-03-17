import Chip from '@mui/material/Chip';

interface ArtistChipProps {
    artist: string;
    isSelected: boolean;
    onClick?: () => void;
}

export default function ArtistChip({ artist, isSelected, onClick }: ArtistChipProps) {
    return (
        <Chip 
            label={artist} 
            onClick={onClick}
            color={isSelected ? "secondary" : "default"}
            variant={isSelected ? "filled" : "outlined"}
            sx={{
                margin: 0.5,
                '&:hover': {
                    backgroundColor: isSelected ? 'secondary.dark' : 'action.hover',
                }
            }}
        />
    );
}