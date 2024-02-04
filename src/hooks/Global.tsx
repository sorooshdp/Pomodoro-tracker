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
});

function initGlobalDefault(globalDefault: Global["global"]) {
    globalDefault = lsGet<Global["global"]>("globalDefault") ?? globalDefault;
    // Processing Default here
    return globalDefault;
}

export const globalCtx = createContext<Global>({ global: globalDefault, setGlobalKey: () => {}, setGlobal: () => {} });
export const useGlobal = () => useContext<Global>(globalCtx);

const createGlobal = () => {
    const [globalState, setGlobalState] = useState<Global["global"]>(globalDefault);

    function setGlobalKey<K extends keyof Global["global"]>(element: K, newVal: Global["global"][K]) {
        setGlobalState((prev) => {
            prev[element] = newVal;
            return { ...prev };
        });
        lsSet("globalDefault", globalState);
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
