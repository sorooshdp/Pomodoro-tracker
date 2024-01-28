import classes from "./Timer.module.css"
import Card from '../components/UI/Card'
import Button from "./UI/Button";

const Timer = () => {
    return (
        <Card style={classes.wrapper}>
            <div>
                <text>20:50</text>
            </div>
            <div>
                <Button text="Start" />
                <Button text="Stop" />      
            </div>
        </Card>
    );
};

export default Timer;
