import { useGlobal } from "../hooks/Global";

const PomodoroMode = ({ changeMode }: { changeMode: (mode: string) => void }) => {
    const { global } = useGlobal();
    return (
        <div className="flex justify-between mt-[3rem] w-[384px] h-[65px]">
            <button
                className={
                    global.mode === "FOCUS"
                        ? "bg-[color:var(--light-color)]  h-[80px] rounded-[24px_0px_0px_24px] flex-[1] shadow-[inset_0px_0px_30px_10px_rgba(0,0,0,0.75)]"
                        : "bg-[color:var(--dark-color)]  h-[80px] rounded-[24px_0px_0px_24px] flex-[1]"
                }
                onClick={() => changeMode("FOCUS")}
            >
                Pomodoro
            </button>
            <button
                className={
                    global.mode === "SHORT_BREAK"
                        ? "bg-[color:var(--light-color)]  h-[80px] rounded-[0px_0px_0px_0px] flex-[1] shadow-[inset_0px_0px_30px_10px_rgba(0,0,0,0.75)]"
                        : "bg-[color:var(--dark-color)]  h-[80px] rounded-[0px_0px_0px_0px] flex-[1]"
                }
                onClick={() => changeMode("SHORT_BREAK")}
            >
                Short break
            </button>
            <button
                className={
                    global.mode === "LONG_BREAK"
                        ? "bg-[color:var(--light-color)]  h-[80px] rounded-[0px_24px_24px_0px] flex-[1] shadow-[inset_0px_0px_30px_10px_rgba(0,0,0,0.75)]"
                        : "bg-[color:var(--dark-color)]  h-[80px] rounded-[0px_24px_24px_0px] flex-[1]"
                }
                onClick={() => changeMode("LONG_BREAK")}
            >
                Long break
            </button>
        </div>
    );
};

export default PomodoroMode;
