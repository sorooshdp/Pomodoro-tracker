import { motion } from "framer-motion";
import { useGlobal } from "../hooks/Global";
import { Mode } from "./Timer";

const PomodoroMode = () => {
    const { global, setGlobalKey } = useGlobal();

    const changeMode = (mode: Mode) => {
        setGlobalKey("running", false);
        setGlobalKey("mode", mode);
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
    };

    return (
        <div className="flex text-[18px] font-bold h-[60px] justify-between mt-[1rem] mb-[2rem] w-[384px] py-[4px] px-[2px] bg-black rounded-full">
            <motion.div
                className={`
                    ${
                        global.mode === Mode.Focus ? "bg-red-600 text-black" : "bg-second"
                    } rounded-[100px_30px_30px_100px] mx-[2px] flex-[1] transition-colors`}
                whileTap={{ scale: 0.8 }}
                style={{ position: "relative" }}
                onClick={() => changeMode(Mode.Focus)}
            >
                <div className="center">Pomodoro</div>
            </motion.div>
            <motion.div
                className={`
                    ${
                        global.mode === Mode.ShortBreak ? "bg-prim text-black" : "bg-second"
                    } rounded-[8px_8px_8px_8px] mx-[2px] flex-[1] transition-colors`}
                whileTap={{ scale: 0.8 }}
                style={{ position: "relative" }}
                onClick={() => changeMode(Mode.ShortBreak)}
            >
                <div className="center w-full">Short break</div>
            </motion.div>
            <motion.div
                className={`
                    ${
                        global.mode === Mode.LongBreak ? "bg-green-600 text-black" : "bg-second"
                    } rounded-[30px_100px_100px_30px] mx-[2px] flex-[1] transition-colors`}
                whileTap={{ scale: 0.8 }}
                style={{ position: "relative" }}
                onClick={() => changeMode(Mode.LongBreak)}
            >
                <div className="center w-full">Long break</div>
            </motion.div>
        </div>
    );
};

export default PomodoroMode;
