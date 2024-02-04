
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
        <button
            onClick={onClick}
            className={`"appearance-none cursor-pointer inline-block text-base font-semibold m-4 min-w-0 text-center no-underline select-none w-full" ${style}`}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
