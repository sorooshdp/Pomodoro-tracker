import { useEffect, useState } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        w: window.innerWidth,
        h: window.innerHeight,
    });

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize({ w: window.innerWidth, h: window.innerHeight });
        });
    }, [window]);

    return windowSize;
};

export default useWindowSize;
