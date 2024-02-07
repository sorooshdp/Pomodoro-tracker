import { Mode } from "../components/Timer";

export function shadowHandle(running: boolean, global?: Global["global"], mode?: Mode) {
    const index = document.documentElement.style;
    if (!running || !global) {
        index.setProperty("--shadow-length", "0px");
        index.setProperty("--shadow-color", "#121212");
        return;
    }
    let w = window.innerWidth; //////////////////////////////////////
    switch (mode) {
        case Mode.Focus:
            index.setProperty("--shadow-color", "#DC2626");
            index.setProperty("--shadow-length", "");
            break;
        case Mode.LongBreak:
            index.setProperty("--shadow-color", "#16A34A");
            index.setProperty("--shadow-length", "");
            break;
        case Mode.ShortBreak:
            index.setProperty("--shadow-color", "#4CACFF");
            index.setProperty("--shadow-length", "");
            break;
    }
}
