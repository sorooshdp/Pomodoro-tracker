import Timer from "./components/Timer";
import UIContextProvider from "./store/ui-context";
import TimerContextProvider from "./components/timer-context";

function App() {
    console.log(" app re-render")

    return (
        <UIContextProvider>
            <TimerContextProvider>
                <Timer />
            </TimerContextProvider>
        </UIContextProvider>
    );
}

export default App;