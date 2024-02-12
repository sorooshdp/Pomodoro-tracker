import { memo, useCallback, useEffect } from "react";
import { useGlobal } from "../hooks/Global";
import Clock from "./Clock";
import Controls from "./Controls";
import PomodoroMode from "./PomodoroMode";
import { playAlarm, shadowHandle, titleHandle } from "../utils/lib";
import { Mode } from "../utils/lib";

const Timer = memo(() => {
    const { global, setGlobalKey } = useGlobal();

    const resetTimer = useCallback(
        (to: Mode) => {
            setGlobalKey("running", false);
            shadowHandle(false, global, to);
            switch (to) {
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
        },
        [global, setGlobalKey]
    );

    const skipHandle = useCallback(() => {
        let nextMode: Mode;
        switch (global.mode) {
            case Mode.Focus:
                if (global.countToLongBreak <= 0) {
                    nextMode = Mode.LongBreak;
                    setGlobalKey("countToLongBreak", 4);
                } else {
                    nextMode = Mode.ShortBreak;
                }
                setGlobalKey("mode", nextMode);
                break;
            case Mode.LongBreak:
            case Mode.ShortBreak:
                nextMode = Mode.Focus;
                setGlobalKey("mode", nextMode);
                setGlobalKey("countToLongBreak", global.countToLongBreak - 1);
                break;
            default:
                // UNREACHABLE
                nextMode = Mode.Focus;
        }
        resetTimer(nextMode);
    }, [global.countToLongBreak, global.mode, resetTimer, setGlobalKey]);

    useEffect(() => {
        if (global.running) {
            const timer = setInterval(() => {
                if (Date.now() - global.lastTick < 10) return;
                if (global.seconds - 1 <= 0) {
                    skipHandle();
                    if (global.alarm) playAlarm();
                    document.title = titleHandle(0, global.mode);
                    clearInterval(timer);
                    return;
                }
                setGlobalKey("lastTick", global.lastTick + 10);
                setGlobalKey("seconds", global.seconds - 1);
                shadowHandle(true, global, global.mode);
                document.title = titleHandle(global.seconds - 1, global.mode);
            }, 50);

            return () => clearInterval(timer);
        }
    }, [global.seconds, global.running, global.mode, global.alarm, setGlobalKey, global, skipHandle]);

    return (
        <div className="flex flex-col items-center justify-center">
            <PomodoroMode />
            <Clock seconds={global.seconds} />
            <Controls skipHandle={skipHandle} />
        </div>
    );
});

export default Timer;
