import { useEffect } from "react";
import { useGlobal } from "../hooks/Global";
import Clock from "./Clock";
import Controls from "./Controls";
import PomodoroMode from "./PomodoroMode";

const Timer = () => {
    const { global, setGlobalKey } = useGlobal();

    useEffect(() => {
        if ( global.seconds <= 0 ) {
            resetTimer()
        }
        if (global.running) {
            const timer = setInterval(() => {
                setGlobalKey("seconds", global.seconds - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            return;
        }
    }, [global.seconds, global.running]);

    const toggleRunning = () => {
        setGlobalKey("running", !global.running);
    };

    const changeMode = (mode : string) => {
        setGlobalKey("running", false)
        if (mode === "FOCUS") {
            setGlobalKey("mode", mode)
            setGlobalKey("seconds", global.focusLength);
        } else if (mode === "LONG_BREAK") {
            setGlobalKey("mode", mode)
            setGlobalKey("seconds", global.longBreakLength);
        } else if ( mode === "SHORT_BREAK") {
            setGlobalKey("mode" , mode)
            setGlobalKey("seconds", global.shortBreakLength);
        }
    }

    const resetTimer = () => {
        setGlobalKey("running" , false)
        if (global.mode === "FOCUS") {
            setGlobalKey("seconds", global.focusLength);
        } else if (global.mode === "LONG_BREAK") {
            setGlobalKey("seconds", global.longBreakLength);
        } else {
            setGlobalKey("seconds", global.shortBreakLength);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <PomodoroMode changeMode={changeMode}/>
            <Clock seconds={global.seconds} />
            <Controls toggleRunning={toggleRunning} resetTimer={resetTimer} />
        </div>
    );
};

export default Timer;
