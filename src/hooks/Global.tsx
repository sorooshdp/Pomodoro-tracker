/**
 * Example:
 *      App.tsx:
 *      const { global, setGlobal, setGlobalKey } = createGlobal();
 *      return <globalCtx.Provider value={{ global: global, setGlobal: setGlobal, setGlobalKey: setGlobalKey }}></globalCtx.Provider>
 *
 *      SomeComp.tsx:
 *      let { global, setGlobal, setGlobalKey } = useGlobal();
 *
 */
import { createContext, useContext, useState } from "react";

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

export const globalCtx = createContext<Global>({ global: globalDefault, setGlobalKey: () => {}, setGlobal: () => {} });
export const useGlobal = () => useContext<Global>(globalCtx);

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
