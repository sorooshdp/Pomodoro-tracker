import React from "react";
import classes from './Button.module.css';

const Button: React.FC<{ text: string; onClick?: () => void }> = (props) => {
    return <button onClick={props.onClick} className={classes.button}>{props.text}</button>;
};

export default Button