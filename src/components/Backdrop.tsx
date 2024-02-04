import React from "react";

import classes from "./backdrop/Backdrop.module.css";

const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
    return <div className={classes.Backdrop} onClick={props.onClick}></div>;
};

export default Backdrop;
