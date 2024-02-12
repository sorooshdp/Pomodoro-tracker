import { motion } from "framer-motion";
import { useGlobal } from "../hooks/Global";
import { Mode } from "../utils/lib";
import { memo, useCallback, CSSProperties, useMemo } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { shadowHandle } from "../utils/lib";
const whileTap = { scale: 0.8 };

const PomodoroMode = memo(() => {
    const { global, setGlobalKey } = useGlobal();
    const windowSize = useWindowSize();

    const containerStyleMemo: CSSProperties = useMemo(
        () => ({
            top: windowSize.h / 10,
        }),
        [windowSize.h]
    );

    const changeMode = useCallback(
        (mode: Mode) => {
            setGlobalKey("running", false);
            setGlobalKey("mode", mode);
            shadowHandle(false);
            switch (mode) {
                case Mode.Focus:
                    setGlobalKey("seconds", global.focusLength);
                    break;
                case Mode.LongBreak:
                    setGlobalKey("seconds", global.longBreakLength);
                    break;
                case Mode.ShortBreak:
                    setGlobalKey("seconds", global.shortBreakLength);
            }
        },
        [global.focusLength, global.longBreakLength, global.shortBreakLength,setGlobalKey]
    );

    return (
        <div
            style={containerStyleMemo}
            className="flex text-[18px] font-bold h-[60px] justify-between absolute  w-[384px] py-[4px] px-[2px] bg-black rounded-full"
        >
            <motion.div
                className={`
                    ${
                        global.mode === Mode.Focus ? "bg-red-600 text-black" : "bg-second"
                    } rounded-[100px_30px_30px_100px] mx-[2px] flex-[1] transition-colors relative`}
                whileTap={whileTap}
                onClick={useCallback(() => changeMode(Mode.Focus), [])}
            >
                <div className="center">Pomodoro</div>
            </motion.div>
            <motion.div
                className={`
                    ${
                        global.mode === Mode.ShortBreak ? "bg-prim text-black" : "bg-second"
                    } rounded-[8px_8px_8px_8px] mx-[2px] flex-[1] transition-colors relative`}
                whileTap={whileTap}
                onClick={useCallback(() => changeMode(Mode.ShortBreak), [])}
            >
                <div className="center w-full">Short break</div>
            </motion.div>
            <motion.div
                className={`
                    ${
                        global.mode === Mode.LongBreak ? "bg-green-600 text-black" : "bg-second"
                    } rounded-[30px_100px_100px_30px] mx-[2px] flex-[1] transition-colors relative`}
                whileTap={whileTap}
                onClick={useCallback(() => changeMode(Mode.LongBreak), [])}
            >
                <div className="center w-full">Long break</div>
            </motion.div>
        </div>
    );
});

export default PomodoroMode;
