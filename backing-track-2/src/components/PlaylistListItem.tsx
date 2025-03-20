import React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Playlist } from '../types/interfaces';

const PlaylistListItem = ({playlistData, onClick }: {key: string, playlistData: Playlist, onClick: () => void }) => {
    return (
        <Box 
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
                borderRadius: 1,
                transition: 'background-color 0.2s',
            }}
        >
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar variant="square" src={playlistData.images[0].url} />
            </ListItemAvatar>
            <ListItemText
                primary={playlistData.name}
                secondary={
                <React.Fragment>
                    <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'inline' }}
                    >
                    {playlistData.owner.display_name}
                    </Typography>
                    {" - "} {playlistData.tracks.total} songs
                </React.Fragment>
                }
            />
            </ListItem>
            <Divider variant="inset" component="li" />
        </Box>
    )
}

export default PlaylistListItem;