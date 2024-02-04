import classes from "./UI/Card.module.css";

const Card: React.FC<{ style: string; isPomodoro: boolean }> = (props) => {
    return (
        <div
            className={`${classes.card} ${props.style} ${
                props.isPomodoro ? classes.pomodoro : classes.break
            }`}
        >
            {" "}
            {props.children}{" "}
        </div>
    );
};

export default Card;