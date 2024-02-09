const CheckboxSettingItem = ({
    title,
    globalState,
    offText,
    onText,
    toggle,
}: {
    title: string;
    globalState: boolean;
    offText: string;
    onText: string;
    toggle: () => void;
}) => {
    return (
        <div className="flex justify-between my-[35px] mx-[2.5rem]">
            <label>{title}</label>
            <div className="cursor-pointer" onClick={toggle}>
                <span className={`${globalState && "text-slate-700"} transition-all duration-200`}>{offText}</span>
                <span className="text-slate-400"> / </span>
                <span className={`${!globalState && "text-slate-700"} transition-all duration-200`}>{onText}</span>
            </div>
        </div>
    );
};

export default CheckboxSettingItem;
