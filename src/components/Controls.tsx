import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { useGlobal } from "../hooks/Global";

const Controls = ({ toggleRunning, resetTimer }: { toggleRunning: () => void; resetTimer: () => void }) => {
    const { global } = useGlobal();

    return (
        <div className="flex justify-between items-center w-[384px]">
            <button className="w-[80px] h-[80px] rounded-[24px] text-[color:var(--text-color) bg-[color:var(--dark-color)] mx-[1rem]">
                <MoreHorizRoundedIcon style={{ fontSize: "30px" }} />
            </button>
            <button
                className="w-[128px] h-[96px] rounded-[24px] text-[color:var(--text-color) bg-[color:var(--dark-color)] mx-[1rem]"
                onClick={toggleRunning}
            >
                {global.running ? (
                    <PauseRoundedIcon style={{ fontSize: "50px" }} />
                ) : (
                    <PlayArrowRoundedIcon style={{ fontSize: "50px" }} />
                )}
            </button>
            <button className="w-[80px] h-[80px] rounded-[24px] text-[color:var(--text-color) bg-[color:var(--dark-color)] mx-[1rem]" onClick={resetTimer}>
                <RotateLeftRoundedIcon style={{ fontSize: "30px" }} />
            </button>
        </div>
    );
};

export default Controls;
