interface Global {
    // default global type here
    global: {
        mode: Mode;
        running: boolean;
        lastTick: number;
        seconds: number;
        focusLength: number;
        countToLongBreak: number;
        shortBreakLength: number;
        longBreakLength: number;
        completedPomodoros: number;
        settingsShow: boolean;
        alarm: boolean;
        verticalClock: boolean;
    };
    setGlobalKey: <K extends keyof Global["global"]>(key: K, newVal: Global["global"][K]) => void;
    setGlobal: (newState: Global["global"]) => void;
}

interface WindowSize {
    w: number;
    h: number;
}
