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
            index.setProperty("--shadow-length", `${calcShadowLength(global.seconds, global.focusLength, h)}px`);
            break;
        case Mode.LongBreak:
            index.setProperty("--shadow-color", "#16A34A");
            index.setProperty("--shadow-length", `${calcShadowLength(global.seconds, global.longBreakLength, h)}px`);
            break;
        case Mode.ShortBreak:
            index.setProperty("--shadow-color", "#4CACFF");
            index.setProperty("--shadow-length", `${calcShadowLength(global.seconds, global.shortBreakLength, h)}px`);
            break;
    }
}

function calcShadowLength(seconds: number, length: number, h: number): number {
    return ((length - seconds) * h) / length;
}

export function clamp(number: number, min: number, max: number): number {
    return Math.max(Math.min(number, max), min);
}

export function log<T>(val: T): T {
    console.log(val);
    return val;
}

export function formatSeconds(seconds: number): string {
    return `${Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

export function titleHandle(seconds: number, mode: Mode): string {
    return `${formatSeconds(seconds)} - ${
        mode === Mode.Focus ? "Focus" : mode === Mode.ShortBreak ? "Short break" : "Long break"
    }`;
}

export function playAlarm() {
    const audio = new Audio("/alarm_beep_2.mp3");
    audio.play();
}
