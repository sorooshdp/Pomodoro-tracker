import { CSSProperties, Dispatch, ReactNode, SetStateAction, memo, useMemo } from "react";
import { motion } from "framer-motion";
import useWindowSize from "../hooks/useWindowSize";

const motionInitial = { opacity: 0, scale: 0 };
const motionTransition = { duration: 0.2 };

const Dialog = memo(
    ({
        data,
        show,
        // setShow,
        children,
    }: {
        data: { w: number; h: number; title: string };
        show: boolean;
        setShow?: Dispatch<SetStateAction<boolean>> | ((newState: boolean) => void);
        children: ReactNode;
    }) => {
        const windowSize = useWindowSize();
        const motionAnimateMemo = useMemo(() => (show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }), [show]);
        const containerStyleMemo: CSSProperties = useMemo(
            () => ({
                left: windowSize.w / 2 - data.w / 2,
                top: windowSize.h / 2 - data.h / 2,
            }),
            [windowSize.w, data.w, windowSize.h, data.h]
        );
        const childrenContainerStyleMemo = useMemo(
            () => ({
                width: data.w,
                height: data.h,
            }),
            [data.w, data.h]
        );

        return (
            <div style={containerStyleMemo} className="z-[1250] absolute w-0 h-0">
                <motion.div
                    animate={motionAnimateMemo}
                    className="absolute left-0 top-0"
                    initial={motionInitial}
                    transition={motionTransition}
                >
                    <div
                        className={`cursor-default bg-black relative overflow-hidden rounded-[24px] duration-200 z-[1250]`}
                        style={childrenContainerStyleMemo}
                    >
                        <div className="absolute cursor-default w-full rounded-b-[12px] h-[calc(100%-24px)] bottom-0 p-[12px]">
                            {children}
                        </div>

                        <div className="absolute left-1/2 top-[20px] -translate-x-1/2 font-bold transition">
                            {data.title}
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }
);

export default Dialog;
