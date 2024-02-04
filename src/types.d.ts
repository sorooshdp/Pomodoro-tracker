interface Global {
    // default global type here
    global: {
        seconds: number;
        focusLength: number;
        countToLongBreak: number;
        shortBreakLength: number;
        longBreakLength: number;
        completedPomodoros: number;
        autoResume: boolean;
        notifications: boolean;
    };
    setGlobalKey: <K extends keyof Global["global"]>(element: K, newVal: Global["global"][K]) => void;
    setGlobal: (newState: Global["global"]) => any;
}
