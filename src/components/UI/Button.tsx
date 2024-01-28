import React from "react";
const Button: React.FC<{ text: string }> = (props) => {
    return <button>{props.text}</button>;
};

export default Button