import { icons, useGlobal } from "../hooks/Global";
import { motion } from "framer-motion";
import { memo, useCallback } from "react";

const whileTap = { scale: 0.8 };

const Controls = memo(({ skipHandle }: { skipHandle: () => void }) => {
    const { global, setGlobalKey } = useGlobal();

    const toggleRunning = useCallback(() => {
        setGlobalKey("running", !global.running);
    }, [global.running]);

    const settingShowHandle = useCallback(() => {
        setGlobalKey("settingsShow", true);
    }, []);

    return (
        <div className="flex justify-between items-center w-fit ">
            <motion.div
                whileTap={whileTap}
                className="relative w-[80px] h-[60px] rounded-[100px] text-txt bg-second mx-[0.5rem]"
                onClick={settingShowHandle}
            >
                {icons.MoreHorizRoundedIcon}
            </motion.div>
            <motion.div
                whileTap={whileTap}
                className={`${
                    global.running ? "!bg-red-600 !text-black" : "hover:bg-prim"
                } relative w-[110px] h-[110px] rounded-[100px] text-txt bg-second mx-[1rem] transition-colors hover:text-black`}
                onClick={toggleRunning}
            >
                {global.running ? <>{icons.PauseRoundedIcon}</> : <>{icons.PlayArrowRoundedIcon}</>}
            </motion.div>
            <motion.div
                whileTap={whileTap}
                className="relative w-[80px] h-[60px] rounded-[100px] text-txt bg-second mx-[0.5rem]"
                onClick={skipHandle}
            >
                {icons.SkipNextRoundedIcon}
            </motion.div>
        </div>
    );
});

export default Controls;
