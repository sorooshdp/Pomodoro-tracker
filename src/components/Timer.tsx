import classes from "./Timer.module.css";
import Card from "./Card";
import Button from "./Button";
import { useEffect, useState } from "react";
import Counter from "./Counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Setting from "./Setting";
import Backdrop from "./Backdrop";
import { useTimer } from "./timer-context";

const Timer: React.FC = () => {
    console.log(" timer component re-render ")
    let completedPomodoros = 0;
    let stopButtonStyle = "";
    const { focusLength, longBreakLength, shortBreakLength, countToLongBreak } =
        useTimer();
    const [isPomodoroTimer, setIsPomodoroTimer] = useState<boolean>(true);
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(focusLength);

    useEffect(() => {
        if (seconds === 0 && isPomodoroTimer ) {
            setIsPomodoroTimer((prevPomodoroState) => !prevPomodoroState);
            setIsBeginning(true);
            setIsStarted(false);
            if (completedPomodoros < countToLongBreak) {
                completedPomodoros++;
                setSeconds(shortBreakLength);
            } else {
                completedPomodoros = 0;
                setSeconds(longBreakLength);
            }
            return;
        } else if ( seconds === 0 && isPomodoroTimer) {
            setIsPomodoroTimer((prevPomodoroState) => !prevPomodoroState);
            setIsBeginning(true);
            setIsStarted(false);
            setSeconds(focusLength)
        }

        if (isStarted) {
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            return;
        }
    }, [seconds, isStarted]);

    const startTimerHandler = () => {
        setIsStarted((prevTimerState) => !prevTimerState);
        if (isBeginning)
            setIsBeginning((prevStopButtonState) => !prevStopButtonState);
    };

    const stopPomodoroHandler = () => {
        if (isStarted) {
            setIsBeginning(true);
            setIsStarted(false);
            setSeconds(focusLength);
        } else {
            setIsBeginning(true);
            setIsStarted(false);
            if (completedPomodoros < countToLongBreak) {
                completedPomodoros++;
                setSeconds(shortBreakLength);
            } else {
                completedPomodoros = 0;
                setSeconds(longBreakLength);
            }
            setIsPomodoroTimer((prevPomodoroState) => !prevPomodoroState);
        }
    };

    const skipBreakHandler = () => {
        setIsBeginning(true);
        setIsStarted(false);
        setSeconds(focusLength);
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
            <FontAwesomeIcon
                icon={faGear}
                className={classes.setting}
                onClick={openSettingHandler}
            />
            <Counter seconds={seconds} />
            <div className={classes.buttonWrapper}>
                <Button
                    text={isStarted ? "Pause" : "Start"}
                    onClick={startTimerHandler}
                />
                {isPomodoroTimer ? (
                    <Button
                        text={
                            isBeginning ? "Stop" : isStarted ? "Stop" : "done"
                        }
                        style={stopButtonStyle}
                        disabled={isBeginning}
                        onClick={stopPomodoroHandler}
                    />
                ) : (
                    <Button
                        text="skip"
                        style={stopButtonStyle}
                        disabled={isBeginning}
                        onClick={skipBreakHandler}
                    />
                )}
            </div>
            {isSettingOpen ? <Setting onClick={closeSettingHandler} /> : null}
            {isSettingOpen ? <Backdrop onClick={closeSettingHandler} /> : null}
        </Card>
    );
};

export default Timer;
