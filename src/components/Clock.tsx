import { motion } from "framer-motion";
import { memo } from "react";

const motionInitial = { opacity: 0, y: 0 };
const motionAnimate = { opacity: 1, y: 0 };
const motionTransition = { duration: 0.3 };
const Clock = memo(({ seconds }: { seconds: number }) => {
    const mins = Math.floor(seconds / 60);
    const min0 = mins % 10;
    const min1 = Math.floor(mins / 10);
    const secs = seconds % 60;
    const sec0 = secs % 10;
    const sec1 = Math.floor(secs / 10);

    return (
        <div className="flex flex-col justify-center items-center absolute top-[45%] -translate-y-1/2">
            <div className="text-[150px] font-[900] h-[150px] flex flex-row">
                <motion.div
                    key={min1 === 0 ? "min1" : min1} // at 00:XX or XX:00 they get the same key and its bad
                    initial={motionInitial}
                    animate={motionAnimate}
                    transition={motionTransition}
                >
                    {min1}
                </motion.div>
                <motion.div
                    key={min0 === 0 ? "min0" : min0}
                    initial={motionInitial}
                    animate={motionAnimate}
                    transition={motionTransition}
                >
                    {min0}
                </motion.div>
            </div>
            <div className="text-[150px] font-[900] h-[200px] flex flex-row relative">
                <motion.div
                    className=""
                    key={sec1 === 0 ? "sec1" : sec1}
                    initial={motionInitial}
                    animate={motionAnimate}
                    transition={motionTransition}
                >
                    {sec1}
                </motion.div>
                <motion.div
                    key={sec0 === 0 ? "sec0" : sec0}
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
