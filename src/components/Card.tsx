import classes from "./UI/Card.module.css";

const Card = ({ style, isPomodoro, children }: { style: string; isPomodoro: boolean; children: React.ReactNode }) => {
    return (
        <div className={`${classes.card} ${style} ${isPomodoro ? classes.pomodoro : classes.break}`}> {children} </div>
    );
};

export default Card;
