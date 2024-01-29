import classes from './Counter.module.css'

interface CounterProps {
    seconds : number,
}

const Counter: React.FC<CounterProps> = (props) => {
    
    const minutes = Math.floor(props.seconds / 60);
    const formattedSeconds = props.seconds % 60;
    return (
        <div className={classes.timer}>
            <span>
                {minutes} :{" "}
                {formattedSeconds < 10
                    ? `0${formattedSeconds}`
                    : formattedSeconds}
            </span>
        </div>
    );
};

export default Counter;
