import { useCallback, useEffect } from "react";
import { useGlobal } from "../hooks/Global";
import Clock from "./Clock";
import Controls from "./Controls";
import PomodoroMode from "./PomodoroMode";

export enum Mode {
    Focus,
    LongBreak,
    ShortBreak,
}

const Timer = () => {
    const { global, setGlobalKey } = useGlobal();

    useEffect(() => {
        if (global.seconds <= 0) {
            resetTimer();
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

    const resetTimer = useCallback(() => {
        setGlobalKey("running", false);
        switch (global.mode) {
            case Mode.Focus:
                setGlobalKey("seconds", global.focusLength);
                break;
            case Mode.LongBreak:
                setGlobalKey("seconds", global.longBreakLength);
                break;
            case Mode.ShortBreak:
                setGlobalKey("seconds", global.shortBreakLength);
                break;
        }
    }, [global.mode]);

    return (
        <div className="flex flex-col items-center justify-center">
            <PomodoroMode />
            <Clock seconds={global.seconds} />
            <Controls resetTimer={resetTimer} />
        </div>
    );
};

export default Timer;
