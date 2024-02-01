import Timer from "./components/Timer";
import UIContextProvider, { useTheme } from "./store/ui-context";
import classes from "./App.module.css";

function App() {
    const { theme } = useTheme();

    return (
        <UIContextProvider>
            <Timer />
        </UIContextProvider>
    );
}

export default App;
