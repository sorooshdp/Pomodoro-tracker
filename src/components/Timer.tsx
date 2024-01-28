import classes from "./Timer.module.css";
import Card from "../components/UI/Card";
import Button from "./UI/Button";
import { useEffect, useState } from "react";

const Timer: React.FC = () => {
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(1200);

    useEffect(() => {
        console.log('use effect')
        if (seconds === 0) return;

        if (isStarted) {
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            return;
        }
    }, [seconds, isStarted]);

    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;

    const timerHandler = () => {
        setIsStarted((prevTimerState) => !prevTimerState);
    };

    return (
        <Card style={classes.wrapper}>
            <div className={ classes.timer}>
                <span>
                    {minutes} :{" "}
                    {formattedSeconds < 10
                        ? `0${formattedSeconds}`
                        : formattedSeconds}
                </span>
            </div>
            <div className={classes.buttonWrapper}>
                <Button text={ isStarted ? 'Pause' : 'Start'} onClick={timerHandler} />
                <Button text="Stop" />
            </div>
        </Card>
    );
};

export default Timer;
