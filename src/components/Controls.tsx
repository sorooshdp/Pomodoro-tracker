import { icons, useGlobal } from "../hooks/Global";
import { motion } from "framer-motion";
import { memo, useCallback, CSSProperties, useMemo } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { shadowHandle } from "../utils/lib";
import { Mode } from "./Timer";

const whileTap = { scale: 0.8 };

const Controls = memo(({ skipHandle }: { skipHandle: () => void }) => {
    const { global, setGlobalKey } = useGlobal();
    const windowSize = useWindowSize();
    const containerStyleMemo: CSSProperties = useMemo(
        () => ({
            bottom: windowSize.h / 12,
        }),
        [windowSize.h]
    );
    const toggleRunning = useCallback(() => {
        setGlobalKey("lastTick", Date.now());
        shadowHandle(!global.running, global, global.mode);
        setGlobalKey("running", !global.running);
    }, [global.running, global.mode]);

    const settingShowHandle = useCallback(() => {
        setGlobalKey("settingsShow", true);
    }, []);

    return (
        <div style={containerStyleMemo} className="flex justify-between absolute items-center w-fit ">
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
                    global.running
                        ? global.mode === Mode.Focus
                            ? "!bg-red-600 !text-black"
                            : global.mode === Mode.ShortBreak
                            ? "!bg-prim !text-black"
                            : "!bg-green-600 !text-black"
                        : "hover:bg-prim"
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
