import { Mode } from "../components/Timer";

export function shadowHandle(running: boolean, global?: Global["global"], mode?: Mode) {
    const index = document.documentElement.style;
    if (!running || !global) {
        index.setProperty("--shadow-length", "0px");
        index.setProperty("--shadow-color", "#121212");
        return;
    }
    let h = window.innerHeight / 2;
    switch (mode) {
        case Mode.Focus:
            index.setProperty("--shadow-color", "#DC2626");
            index.setProperty(
                "--shadow-length",
                `${((global.focusLength - global.seconds) * h) / global.focusLength}px`
            );
            index.setProperty("--shadow-spread", `${(global.focusLength - global.seconds) * 100}px`);
            break;
        case Mode.LongBreak:
            index.setProperty("--shadow-color", "#16A34A");
            index.setProperty(
                "--shadow-length",
                `${((global.longBreakLength - global.seconds) * h) / global.longBreakLength}px`
            );
            index.setProperty("--shadow-spread", `${(global.longBreakLength - global.seconds) * 100}px`);
            break;
        case Mode.ShortBreak:
            index.setProperty("--shadow-color", "#4CACFF");
            index.setProperty(
                "--shadow-length",
                `${((global.shortBreakLength - global.seconds) * h) / global.shortBreakLength}px`
            );
            index.setProperty("--shadow-spread", `${(global.shortBreakLength - global.seconds) * 100}px`);
            break;
    }
}
