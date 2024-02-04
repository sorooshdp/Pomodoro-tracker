interface Global {
    // default global type here
    global: {};
    setGlobalKey: <K extends keyof Global["global"]>(element: K, newVal: Global["global"][K]) => void;
    setGlobal: (newState: Global["global"]) => any;
}
