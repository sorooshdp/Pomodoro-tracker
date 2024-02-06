import Settings from "./components/Settings";
import Timer from "./components/Timer";
import createGlobal, { globalCtx } from "./hooks/Global";

function App() {
    const { global, setGlobal, setGlobalKey } = createGlobal();

    return (
        <globalCtx.Provider
            value={{
                global: global,
                setGlobal: setGlobal,
                setGlobalKey: setGlobalKey,
            }}
        >
            <Timer />
            <Settings />
        </globalCtx.Provider>
    );
}

export default App;
