import classes from "./UI/Button.module.css";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    style?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button onClick={props.onClick} className={`${classes.button} ${props.style}`} disabled={props.disabled}>
            {props.text}
        </button>
    );
};

export default Button;
