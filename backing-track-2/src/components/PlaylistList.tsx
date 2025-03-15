import PlaylistListItem from "./PlaylistListItem";
import List from '@mui/material/List';

const PlaylistList = ({ playlists, onPlaylistClick }: { playlists: any[], onPlaylistClick: (playlist: any) => void }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {playlists.filter(playlist => playlist !== null).map((playlist) => <PlaylistListItem key={playlist.id} playlistData={playlist} onClick={() => onPlaylistClick(playlist)} />)}
    </List>
  );
}

export default PlaylistList;