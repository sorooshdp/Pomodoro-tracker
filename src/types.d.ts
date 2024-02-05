interface Global {
    // default global type here
    global: {
        mode: "FOCUS" | "LONG_BREAK" | "SHORT_BREAK";
        running: boolean;
        seconds: number;
        focusLength: number;
        countToLongBreak: number;
        shortBreakLength: number;
        longBreakLength: number;
        completedPomodoros: number;
    };
    setGlobalKey: <K extends keyof Global["global"]>(element: K, newVal: Global["global"][K]) => void;
    setGlobal: (newState: Global["global"]) => any;
}
