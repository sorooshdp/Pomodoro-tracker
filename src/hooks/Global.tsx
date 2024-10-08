import { createContext, useContext, useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
// import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { AddCircleOutlineRounded, DeleteOutlineRounded, ModeEditOutlineRounded } from "@mui/icons-material";

// Default Global type ../types.d.ts:  Global["global"]
export const globalDefault: Global["global"] = initGlobalDefault({
    // Default global object
    mode: 0, // Mode.Focus gives reading undefined error
    lastTick: 0,
    running: false,
    seconds: 25 * 60,
    focusLength: 25 * 60,
    countToLongBreak: 4,
    shortBreakLength: 5 * 60,
    longBreakLength: 15 * 60,
    completedPomodoros: 0,
    settingsShow: false,
    alarm: true,
    verticalClock: true,
    isTodoOpen: false,
    editingTodoId: null,
    todoList: [],
});

function initGlobalDefault(globalDefault: Global["global"]): Global["global"] {
    globalDefault = lsGet<Global["global"]>("globalDefault") ?? globalDefault;
    // Processing Default here
    globalDefault.running = false;
    globalDefault.settingsShow = false;
    globalDefault.editingTodoId = null;

    if (globalDefault.todoList.length === 0) {
        globalDefault.todoList.push({ text: "wake up!", done: false, id: Date.now() });
    }

    return globalDefault;
}

export const icons = {
    MoreHorizRoundedIcon: <MoreHorizRoundedIcon className="center" style={{ fontSize: "40px" }} />,
    PauseRoundedIcon: <PauseRoundedIcon className="center transition-colors" style={{ fontSize: "60px" }} />,
    PlayArrowRoundedIcon: <PlayArrowRoundedIcon className="center transition-colors" style={{ fontSize: "60px" }} />,
    // RotateLeftRoundedIcon: <RotateLeftRoundedIcon className="center" style={{ fontSize: "40px" }} />,
    SkipNextRoundedIcon: <SkipNextRoundedIcon className="center" style={{ fontSize: "40px" }} />,
    ArrowLeftRoundedIcon: <ArrowLeftRoundedIcon style={{ fontSize: "40px" }} />,
    ArrowRightRoundedIcon: (
        <ArrowRightRoundedIcon
            className="opacity-0 hover:opacity-100 cursor-pointer"
            style={{ fontSize: "80px", transition: "opacity 0.5s ease, transform 0.3s ease" }}
        />
    ),
    AddCircleOutlineRounded: <AddCircleOutlineRounded style={{ fontSize: "40px" }} />,
    DeleteOutlineRounded: <DeleteOutlineRounded style={{ fontSize: "25px" }} />,
    ModeEditOutlineRounded: <ModeEditOutlineRounded style={{ fontSize: "25px" }} />,
};

export const alarmAudio = new Audio("/alarm_beep_2.mp3");

export const globalCtx = createContext<Global>({ global: globalDefault, setGlobalKey: () => {}, setGlobal: () => {} });
export const useGlobal = () => useContext<Global>(globalCtx);

/**
 * # Example
 *
 * App.tsx:
 * ```jsx
 * const { global, setGlobal, setGlobalKey } = createGlobal();
 * return (
 *     <globalCtx.Provider value={{ global: global, setGlobal: setGlobal, setGlobalKey: setGlobalKey }}>
 *          <SomeComp />
 *     </globalCtx.Provider>
 * )
 * ```
 *
 * SomeComp.tsx:
 * ```jsx
 * let { global, setGlobal, setGlobalKey } = useGlobal();
 * ```
 *
 */
const createGlobal = () => {
    const [globalState, setGlobalState] = useState<Global["global"]>(globalDefault);

    function setGlobalKey<K extends keyof Global["global"]>(key: K, newVal: Global["global"][K]) {
        setGlobalState((prev) => {
            prev[key] = newVal;
            lsSet("globalDefault", prev); // TODO this is not good
            return { ...prev };
        });
    }
    function setGlobal(newState: Global["global"]) {
        setGlobalState(newState);
        lsSet("globalDefault", newState);
    }
    return { global: globalState, setGlobalKey, setGlobal };
};

export async function lsSet(key: string, obj: object) {
    localStorage.setItem(key, JSON.stringify(obj));
}

export function lsGet<T>(key: string): null | T {
    return JSON.parse(localStorage.getItem(key) ?? "null");
}

export default createGlobal;
