import { useEffect, useState } from "react"

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        w: window.innerWidth,
        h: window.innerHeight,
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ w: window.innerWidth, h: window.innerHeight })
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return windowSize
}

export default useWindowSize
