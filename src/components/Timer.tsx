import classes from "./Timer.module.css";
import Card from "./Card";
import Button from "./Button";
import { useEffect, useState } from "react";
import Counter from "./Counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Setting from "./Setting";
import Backdrop from "./Backdrop";
import { useGlobal } from "../hooks/Global";

const Timer: React.FC = () => {
    const { global, setGlobal, setGlobalKey } = useGlobal();
    console.log(" timer component re-render ");
    let stopButtonStyle = "";
    const [isPomodoroTimer, setIsPomodoroTimer] = useState<boolean>(true);
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    useEffect(() => {
        if (global.seconds === 0 && isPomodoroTimer) {
            setIsPomodoroTimer((prevPomodoroState) => !prevPomodoroState);
            setIsBeginning(true);
            setIsStarted(false);
            setGlobalKey("completedPomodoros", global.completedPomodoros++);
            if (global.completedPomodoros % global.countToLongBreak > 0) {
                setGlobalKey("seconds", global.shortBreakLength);
            } else {
                setGlobalKey("seconds", global.longBreakLength);
            }
        } else if (global.seconds === 0 && !isPomodoroTimer) {
            setIsPomodoroTimer((prevPomodoroState) => !prevPomodoroState);
            setIsBeginning(true);
            setIsStarted(false);
            setGlobalKey("seconds", global.focusLength);
        }
        setGlobal(global);

        if (isStarted) {
            const timer = setInterval(() => {
                setGlobalKey("seconds", global.seconds--);
                setGlobal(global);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            return;
        }
    }, [global.seconds, isStarted]);

    const startTimerHandler = () => {
        setIsStarted((prevTimerState) => !prevTimerState);
        if (isBeginning) setIsBeginning((prevStopButtonState) => !prevStopButtonState);
    };

    const stopPomodoroHandler = () => {
        if (isStarted) {
            setIsBeginning(true);
            setIsStarted(false);
            setGlobalKey('seconds', global.focusLength)
        } else {
            setIsBeginning(true);
            setIsStarted(false);
            if (global.completedPomodoros < global.countToLongBreak) {
                setGlobalKey('completedPomodoros', global.completedPomodoros)
                setGlobalKey('seconds', global.shortBreakLength)
            } else {
                setGlobalKey('completedPomodoros', global.completedPomodoros++)
                setGlobalKey('seconds', global.longBreakLength)
            }
            setGlobal(global)
            setIsPomodoroTimer((prevPomodoroState) => !prevPomodoroState);
        }
    };

    const skipBreakHandler = () => {
        setIsBeginning(true);
        setIsStarted(false);
        setGlobalKey('seconds', global.focusLength)
        setIsPomodoroTimer((prevPomodoroState) => !prevPomodoroState);
    };

    const openSettingHandler = () => {
        setIsSettingOpen((prevSettingState) => !prevSettingState);
    };

    const closeSettingHandler = () => {
        setIsSettingOpen((prevSettingState) => !prevSettingState);
    };

    if (isBeginning) {
        stopButtonStyle = `${classes.noPointer}`;
    } else if (isStarted) {
        stopButtonStyle = `${classes.pointer}`;
    }

    return (
        <Card style={classes.wrapper} isPomodoro={isPomodoroTimer}>
            <FontAwesomeIcon icon={faGear} className={classes.setting} onClick={openSettingHandler} />
            <Counter seconds={global.seconds} />
            <div className={classes.buttonWrapper}>
                <Button text={isStarted ? "Pause" : "Start"} onClick={startTimerHandler} />
                {isPomodoroTimer ? (
                    <Button
                        text={isBeginning ? "Stop" : isStarted ? "Stop" : "done"}
                        style={stopButtonStyle}
                        disabled={isBeginning}
                        onClick={stopPomodoroHandler}
                    />
                ) : (
                    <Button text="skip" style={stopButtonStyle} disabled={isBeginning} onClick={skipBreakHandler} />
                )}
            </div>
            {isSettingOpen ? <Setting onClick={closeSettingHandler} /> : null}
            {isSettingOpen ? <Backdrop onClick={closeSettingHandler} /> : null}
        </Card>
    );
};

export default Timer;
