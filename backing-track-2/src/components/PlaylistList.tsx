import PlaylistListItem from "./PlaylistListItem";
import List from '@mui/material/List';
import { Playlist } from '../types/interfaces';

const PlaylistList = ({ playlists, onPlaylistClick }: { playlists: Playlist[], onPlaylistClick: (playlist: Playlist) => void }) => {
  return (
    <List sx={{ 
      width: '100%', 
      maxWidth: 360, 
      bgcolor: 'background.paper',
      margin: '0 auto'
    }}>
      {playlists.filter(playlist => playlist !== null).map((playlist) => <PlaylistListItem key={playlist.id} playlistData={playlist} onClick={() => onPlaylistClick(playlist)} />)}
    </List>
  );
}

export default PlaylistList;