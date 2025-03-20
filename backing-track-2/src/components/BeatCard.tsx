import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Beat } from "../types/interfaces";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import YouTube from 'react-youtube';
import Modal from '@mui/material/Modal';
import { downloadBeat } from '../services/api';

const BeatCard = ({ beat, isLoading }: { beat: Beat, isLoading: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleThumbnailClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const blobUrl = await downloadBeat(beat);
      if (blobUrl) {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = blobUrl;
        const filenameParts = [
          beat.keyCenter,
          beat.modality,
          beat.bpm,
          beat.title
        ].filter(Boolean);
        
        link.download = `${filenameParts.join('_')}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error('Download failed:', error);
    
    } finally {
      setIsDownloading(false);
    }
  };


  return (
    <>
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
                onClick={handleThumbnailClick}
                sx={{ 
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  cursor: 'pointer'
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
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <CircularProgress size="1.5rem" />
                    ) : (
                      <DownloadIcon />
                    )}
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Box>
        )}
      </Card>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& .MuiModal-backdrop': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      >
        <Box sx={{
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 1,
        }}>
          {beat.id && (
            <YouTube
              videoId={beat.id}
              opts={{
                playerVars: {
                  autoplay: 1,
                  origin: window.location.origin,
                  enablejsapi: 1,
                  rel: 0,
                  modestbranding: 1,
                },
                host: 'https://www.youtube-nocookie.com',
              }}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default BeatCard;
