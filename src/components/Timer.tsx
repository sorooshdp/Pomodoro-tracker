import classes from "./Timer.module.css";
import Card from "../components/UI/Card";
import Button from "./UI/Button";
import { useEffect, useState } from "react";
import Counter from "./Counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Setting from "./modal/Setting";
import Backdrop from "./backdrop/Backdrop";

const Timer: React.FC = () => {
    let stopButtonStyle = "";
    const [isPomodoroTimer, setIsPomodoroTimer] = useState<boolean>(true);
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [IsSettingOpen, setIsSettingOpen] = useState<boolean>(false);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(120);

    useEffect(() => {
        if (seconds === 0) {
            setIsPomodoroTimer((prevPomodoroState) => !prevPomodoroState);
            setIsBeginning(true);
            setIsStarted(false);
            setSeconds(300);
            return;
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
            setSeconds(1200);
        } else {
            setIsBeginning(true);
            setIsStarted(false);
            setSeconds(300);
            setIsPomodoroTimer((prevPomodoroState) => !prevPomodoroState);
        }
    };

    const skipBreakHandler = () => {
        setIsBeginning(true);
        setIsStarted(false);
        setSeconds(1200);
        setIsPomodoroTimer((prevPomodoroState) => !prevPomodoroState);
    };

    const openSettingHandler = () => {
        setIsSettingOpen((prevSettingState) => !prevSettingState)
    };

    const closeSettingHandler = () => {
        setIsSettingOpen((prevSettingState) => !prevSettingState)
    }

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
            {IsSettingOpen ? <Setting /> : null}
            {IsSettingOpen ? <Backdrop onClick={closeSettingHandler} /> : null}
        </Card>
    );
};

export default Timer;
