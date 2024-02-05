import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { useGlobal } from "../hooks/Global";
import { motion } from "framer-motion";

const Controls = ({ resetTimer }: { resetTimer: () => void }) => {
    const { global, setGlobalKey } = useGlobal();

    const toggleRunning = () => {
        setGlobalKey("running", !global.running);
    };

    return (
        <div className="flex justify-between items-center w-fit absolute bottom-[100px]">
            <motion.div
                whileTap={{ scale: 0.8 }}
                className="relative w-[80px] h-[60px] rounded-[100px] text-txt bg-second mx-[0.5rem]"
            >
                <MoreHorizRoundedIcon className="center" style={{ fontSize: "40px" }} />
            </motion.div>
            <motion.div
                whileTap={{ scale: 0.8 }}
                className={`${
                    global.running ? "!bg-red-600 !text-black" : "hover:bg-prim"
                } relative w-[110px] h-[110px] rounded-[100px] text-txt bg-second mx-[1rem] transition-colors hover:text-black`}
                onClick={toggleRunning}
            >
                {global.running ? (
                    <PauseRoundedIcon className="center transition-colors" style={{ fontSize: "60px" }} />
                ) : (
                    <PlayArrowRoundedIcon className="center transition-colors" style={{ fontSize: "60px" }} />
                )}
            </motion.div>
            <motion.div
                whileTap={{ scale: 0.8 }}
                className="relative w-[80px] h-[60px] rounded-[100px] text-txt bg-second mx-[0.5rem]"
                onClick={resetTimer}
            >
                <RotateLeftRoundedIcon className="center" style={{ fontSize: "40px" }} />
            </motion.div>
        </div>
    );
};

export default Controls;
