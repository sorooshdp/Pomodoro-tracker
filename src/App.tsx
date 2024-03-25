import Settings from "./components/Settings";
import Timer from "./components/Timer";
import TodoMenu from "./components/Todomenu";
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
            <TodoMenu />
            <Timer />
            <Settings />
        </globalCtx.Provider>
    );
}

export default App;
