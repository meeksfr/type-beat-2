import Stack from "@mui/material/Stack";
import BeatCard from "./BeatCard";
import { Beat } from "../types/interfaces";

const BeatStack = ({ beats, loadingBeats }: { beats: Beat[], loadingBeats: string[] }) => {
  return (
    <Stack direction="column">
        {beats.map((beat, index) => (
            <BeatCard key={index} beat={beat} isLoading={loadingBeats.includes(beat.url)} />
        ))}
    </Stack>
  );
};

export default BeatStack;
