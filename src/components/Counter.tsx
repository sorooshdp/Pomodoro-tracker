import classes from "./Counter.module.css";

const Counter = ({ seconds }: { seconds: number }) => {
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;
    return (
        <div className={classes.timer}>
            <span>
                {minutes} : {formattedSeconds < 10 ? `0${formattedSeconds}` : formattedSeconds}
            </span>
        </div>
    );
};

export default Counter;
