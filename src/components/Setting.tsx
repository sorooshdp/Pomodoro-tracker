// import { createPortal } from "react-dom";
// import React from "react";
// import { useGlobal } from "../hooks/Global";
// import { useCallback } from "react";
// const Setting = ({ onClick }: { onClick: () => void }) => {
//     const { global, setGlobalKey } = useGlobal();
   

//     const container = document.getElementById("modal")!;
//     return createPortal(
//         <div className="absolute z-200 max-h-595px w-112 flex flex-col bg-stone-900 p-10px text-center top-1/20 left-1/3 transition-all rounded-lg overflow-scroll">
//             <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px ">
//                 <h3 className="inline">Settings</h3>
//             </div>
//             <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
//                 <label htmlFor="chageTheme">Dark mode</label>
//                 {/* <input
//                     type="checkbox"
//                     id="changeTheme"
//                     className="cursor-pointer appearance-none border-none h-5 m-0 relative w-8 bg-slate-500 rounded-lg "
//                     checked={theme === "DARK" ? true : false}
//                     onChange={toggleTheme}
//                 /> */}
//             </div>
//             <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
//                 <label htmlFor="focus-length">Focus length</label>
//                 <div className="flex">
//                     <input
//                         id="focus-length"
//                         type="number"
//                         className="appearance-none w-16 h-10 text-center"
//                         value={global.focusLength}
//                         onChange={changeFocusHandler}
//                     />
//                     <div className="flex flex-col">
//                         <button className="bg-slate-900 text-slate-50 border-solid border-slate-950 border-2 "></button>
//                         <button></button>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
//                 <label htmlFor="long-break-delay">Long break delay</label>
//                 <div className="flex">
//                     <input
//                         id="long-break-delay"
//                         type="number"
//                         className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px"
//                         value={global.countToLongBreak}
//                         onChange={changeLongBreakHandler}
//                     />
//                     <div className="flex flex-col">
//                         <button className="bg-slate-900 text-slate-50 border-solid border-slate-950 border-2 "></button>
//                         <button></button>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
//                 <label htmlFor="short-break-length">Short break length</label>
//                 <div className="flex">
//                     <input
//                         type="number"
//                         className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px"
//                         id="short-break-length"
//                         value={global.shortBreakLength}
//                         onChange={changeShortBreakHandler}
//                     />
//                     <div className="flex flex-col">
//                         <button className="bg-slate-900 text-slate-50 border-solid border-slate-950 border-2 "></button>
//                         <button></button>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
//                 <label htmlFor="long-break-length">Long break length</label>
//                 <div className="flex">
//                     <input
//                         type="number"
//                         className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px"
//                         id="long-break-length"
//                         value={global.longBreakLength}
//                         onChange={changeLongBreakLengthHandler}
//                     />
//                     <div className="flex flex-col">
//                         <button className="bg-slate-900 text-slate-50 border-solid border-slate-950 border-2 "></button>
//                         <button></button>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
//                 <label htmlFor="auto-resume">Auto resume timer</label>
//                 <input
//                     type="checkbox"
//                     id="auto-resume"
//                     className="cursor-pointer appearance-none border-none h-5 m-0 relative w-8"
//                     checked={global.autoResume}
//                     onChange={toggleAutoResumeHandler}
//                 />
//             </div>
//             <div className="flex justify-center items-center mt-2px mr-9px mb-35px ml-9px">
//                 <label htmlFor="notifications">Notifications</label>
//                 <input
//                     type="checkbox"
//                     id="notifications"
//                     className="cursor-pointer appearance-none border-none h-5 m-0 relative w-8"
//                     checked={global.notifications}
//                     onChange={toggleNotificationsHandler}
//                 />
//             </div>
//         </div>,
//         container
//     );
// };

// export default Setting;
