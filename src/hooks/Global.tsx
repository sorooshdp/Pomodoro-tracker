import { createContext, useContext, useState } from "react"
import { debounce } from "../utils/debounce"

// Default Global type ../types.d.ts:  Global["global"]
export const globalDefault: Global["global"] = initGlobalDefault({
    // Default global object
    mode: 0, // Mode.Focus = 0 (enum defined in types.d.ts)
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
})

function initGlobalDefault(globalDefault: Global["global"]): Global["global"] {
    globalDefault = lsGet<Global["global"]>("globalDefault") ?? globalDefault
    // Processing Default here
    globalDefault.running = false
    globalDefault.settingsShow = false
    globalDefault.editingTodoId = null

    if (globalDefault.todoList.length === 0) {
        globalDefault.todoList.push({
            text: "wake up!",
            done: false,
            id: Date.now(),
        })
    }

    return globalDefault
}

export const alarmAudio = new Audio("/alarm_beep_2.mp3")

// Debounced localStorage save to improve performance
const debouncedLsSave = debounce(
    (key: string, obj: object) => lsSet(key, obj),
    500,
)

export const globalCtx = createContext<Global>({
    global: globalDefault,
    setGlobalKey: () => {},
    setGlobal: () => {},
})
export const useGlobal = () => useContext<Global>(globalCtx)

/**
 * # Example
 *
 * App.tsx:
 * ```jsx
 * const { global, setGlobal, setGlobalKey } = useCreateGlobal();
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
const useCreateGlobal = () => {
    const [globalState, setGlobalState] =
        useState<Global["global"]>(globalDefault)

    function setGlobalKey<K extends keyof Global["global"]>(
        key: K,
        newVal: Global["global"][K],
    ) {
        setGlobalState((prev) => {
            const newState = { ...prev, [key]: newVal }
            debouncedLsSave("globalDefault", newState)
            return newState
        })
    }
    function setGlobal(newState: Global["global"]) {
        setGlobalState(newState)
        debouncedLsSave("globalDefault", newState)
    }
    return { global: globalState, setGlobalKey, setGlobal }
}

export function lsSet(key: string, obj: object): void {
    try {
        localStorage.setItem(key, JSON.stringify(obj))
    } catch (error) {
        console.error("Failed to save to localStorage:", error)
    }
}

export function lsGet<T>(key: string): null | T {
    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    } catch (error) {
        console.error("Failed to read from localStorage:", error)
        return null
    }
}

export default useCreateGlobal
