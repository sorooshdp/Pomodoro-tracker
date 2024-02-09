import { log } from "../utils/lib";

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
    log(globalState);
    return (
        <div className="flex justify-between my-[30px] mx-[2.0rem]">
            <label>{title}</label>
            <div className="cursor-pointer" onClick={toggle}>
                <span className={`${globalState && "text-zinc-700"} transition-all duration-200`}>{offText}</span>
                <span className="text-zinc-400"> / </span>
                <span className={`${!globalState && "text-zinc-700"} transition-all duration-200`}>{onText}</span>
            </div>
        </div>
    );
};

export default CheckboxSettingItem;
