import classes from "./backdrop/Backdrop.module.css";

const Backdrop = ({ onClick }: { onClick: () => void }) => {
    return <div className={classes.Backdrop} onClick={onClick}></div>;
};

export default Backdrop;
