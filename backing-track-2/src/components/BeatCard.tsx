import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Beat } from "../types/interfaces";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';

const BeatCard = ({ beat, isLoading }: { beat: Beat, isLoading: boolean }) => {
  return (
    <Card>
      {isLoading ? (
        <CardContent>
          <CircularProgress />
        </CardContent>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {beat.thumbnailUrl && (
            <CardMedia 
              component="img" 
              image={beat.thumbnailUrl} 
              alt={beat.title}
              sx={{ 
                width: '100px',
                height: '100px',
                objectFit: 'cover'
              }}
            />
          )}
          <CardContent sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h6" sx={{ flex: 1 }}>{beat.title || beat.url}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                {beat.bpm && `${beat.bpm} BPM`}
                {beat.bpm && beat.keyCenter && beat.modality && <br />}
                {beat.keyCenter && beat.modality && `${beat.keyCenter} ${beat.modality}`}
                </Typography>
                <IconButton 
                  color="primary"
                  onClick={() => console.log('Download clicked')}
                >
                  <DownloadIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Box>
      )}
    </Card>
  );
};

export default BeatCard;
