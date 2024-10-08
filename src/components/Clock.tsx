import { motion } from "framer-motion";
import { memo } from "react";
import { useGlobal } from "../hooks/Global";

const motionInitial = { opacity: 0 };
const motionAnimate = { opacity: 1 };
const motionTransition = { duration: 0.3 };

const Clock = memo(({ seconds }: { seconds: number }) => {
    const { global } = useGlobal();
    const mins = Math.floor(seconds / 60);
    const min0 = mins % 10;
    const min1 = Math.floor(mins / 10);
    const secs = seconds % 60;
    const sec0 = secs % 10;
    const sec1 = Math.floor(secs / 10);


    return (
        <div className={`${global.verticalClock ? "flex-col" : "flex-row"} flex justify-center items-center relative`}>
            <div
                className={`text-[150px] leading-[150px] font-[900] h-fit flex flex-row w-[210px] ${
                    !global.verticalClock && "absolute left-[-250px]"
                }  sm:left-[-200px] sm:text-[120px] sm:w-[175px]`}
            >
                <motion.div
                    className="w-1/2"
                    key={global.mode + "min1" + min1}
                    initial={motionInitial}
                    animate={motionAnimate}
                    transition={motionTransition}
                >
                    {min1}
                </motion.div>
                <motion.div
                    className="w-1/2"
                    key={global.mode + "min0" + min0}
                    initial={motionInitial}
                    animate={motionAnimate}
                    transition={motionTransition}
                >
                    {min0}
                </motion.div>
            </div>
            {!global.verticalClock && (
                <div className="text-[150px] pb-[10px] absolute left-1/2 -translate-x-1/2 sm:text-[120px]">:</div>
            )}
            <div
                className={`text-[150px] leading-[150px] font-[900] h-fit flex flex-row w-[210px] ${
                    !global.verticalClock && "absolute right-[-250px]"
                } sm:right-[-200px] sm:text-[120px] sm:w-[175px]`}
            >
                <motion.div
                    className="w-1/2"
                    key={global.mode + "sec1" + sec1}
                    initial={motionInitial}
                    animate={motionAnimate}
                    transition={motionTransition}
                >
                    {sec1}
                </motion.div>
                <motion.div
                    className="w-1/2"
                    key={global.mode + "sec0" + sec0}
                    initial={motionInitial}
                    animate={motionAnimate}
                    transition={motionTransition}
                >
                    {sec0}
                </motion.div>
            </div>
        </div>
    );
});

export default Clock;
