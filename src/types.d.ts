interface Global {
    // default global type here
    global: {
        mode: Mode;
        running: boolean;
        seconds: number;
        focusLength: number;
        countToLongBreak: number;
        shortBreakLength: number;
        longBreakLength: number;
        completedPomodoros: number;
    };
    setGlobalKey: <K extends keyof Global["global"]>(key: K, newVal: Global["global"][K]) => void;
    setGlobal: (newState: Global["global"]) => any;
}
