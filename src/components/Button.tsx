import classes from "./UI/Button.module.css";

const Button = ({
    text,
    onClick,
    style,
    disabled,
}: {
    text: string;
    onClick?: () => void;
    style?: string;
    disabled?: boolean;
}) => {
    return (
        <button onClick={onClick} className={`${classes.button} ${style}`} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
