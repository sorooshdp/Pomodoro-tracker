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
        isTodoOpen: boolean;
        todoList: Array<TodoList>;
    };
    setGlobalKey: <K extends keyof Global["global"]>(key: K, newVal: Global["global"][K]) => void;
    setGlobal: (newState: Global["global"]) => void;
}

interface TodoList {
    text: string;
    done: boolean;
    id: number;
}

interface WindowSize {
    w: number;
    h: number;
}
