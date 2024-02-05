import { createContext, useContext, useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";

// Default Global type ../types.d.ts:  Global["global"]
export let globalDefault: Global["global"] = initGlobalDefault({
    // Default global object
    mode: 0, // Mode.Focus gives reading undefined error
    running: false,
    seconds: 25 * 60,
    focusLength: 25 * 60,
    countToLongBreak: 4,
    shortBreakLength: 5 * 60,
    longBreakLength: 15 * 60,
    completedPomodoros: 0,
});

function initGlobalDefault(globalDefault: Global["global"]): Global["global"] {
    globalDefault = lsGet<Global["global"]>("globalDefault") ?? globalDefault;
    // Processing Default here
    globalDefault.running = false;
    return globalDefault;
}

export const icons = {
    MoreHorizRoundedIcon: <MoreHorizRoundedIcon className="center" style={{ fontSize: "40px" }} />,
    PauseRoundedIcon: <PauseRoundedIcon className="center transition-colors" style={{ fontSize: "60px" }} />,
    PlayArrowRoundedIcon: <PlayArrowRoundedIcon className="center transition-colors" style={{ fontSize: "60px" }} />,
    RotateLeftRoundedIcon: <RotateLeftRoundedIcon className="center" style={{ fontSize: "40px" }} />,
};

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
