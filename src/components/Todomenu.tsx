import { icons, useGlobal } from "../hooks/Global";

const TodoMenu = () => {
    const { global, setGlobalKey } = useGlobal();

    const toggleTodoMenu = () => {
        setGlobalKey("isTodoOpen", !global.isTodoOpen);
    };

    return (
        <div
            className={`absolute top-[3px] left-[3px] h-[calc(100vh-6px)] w-[24rem] bg-black shadow-lg transition-transform duration-300 rounded-[24px] ${
                global.isTodoOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div
                className={`translate-x-[24rem] h-full w-[80px] flex items-center transition-transform duration-300 ${global.isTodoOpen ? "rotate-180" : "rotate-0"}`}
                onClick={toggleTodoMenu}
            >
                {icons.ArrowRightRoundedIcon}
            </div>
        </div>
    );
};

export default TodoMenu;
