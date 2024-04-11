import { useRef } from "react";
import { icons, useGlobal } from "../hooks/Global";
import { AnimatePresence, motion } from "framer-motion";

const TodoMenu = () => {
    const todoInputRef = useRef<HTMLInputElement>(null);
    const { global, setGlobalKey } = useGlobal();

    const toggleTodoMenu = () => {
        setGlobalKey("isTodoOpen", !global.isTodoOpen);
    };

    const addTodo = () => {
        if (todoInputRef.current && todoInputRef.current.value.trim()) {
            const newTodo = { text: todoInputRef.current.value.trim(), done: false, id: Date.now() };
            setGlobalKey("todoList", [...global.todoList, newTodo]);
            todoInputRef.current.value = "";
        }
    };

    const editTodo = (id: number, newText: string) => {
        setGlobalKey("editingTodoId", null); // Exit edit mode
        setGlobalKey(
            "todoList",
            global.todoList.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
        );
    };

    const removeTodo = (id: number) => {
        setGlobalKey(
            "todoList",
            global.todoList.filter((todo) => todo.id !== id)
        );
    };

    const toggleTodo = (id: number) => {
        setGlobalKey(
            "todoList",
            global.todoList.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
        );
    };

    return (
        <div
            className={`absolute top-[3px] left-0 h-[calc(100vh-6px)] w-[26rem] sm:w-[30.7rem] bg-black shadow-lg transition-transform duration-300 rounded-[24px] z-50 ${
                global.isTodoOpen ? "translate-x-0 left-[4px]" : "-translate-x-full"
            }`}
        >
            <div
                className={`translate-x-[25rem] sm:translate-x-[29rem] h-full w-[80px] flex items-center transition-transform duration-300 ${
                    global.isTodoOpen ? "rotate-180" : "rotate-0"
                }`}
                onClick={toggleTodoMenu}
            >
                {icons.ArrowRightRoundedIcon}
            </div>
            <div className="absolute flex items-center justify-center top-[20px] left-[20px] w-full h-[44px]">
                <input
                    ref={todoInputRef}
                    className="w-full rounded-lg h-full p-[8px] bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    placeholder="Enter todo here..."
                    autoComplete="off"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addTodo();
                        }
                    }}
                />
                <button
                    className="relative left-[-44px] text-white hover:text-slate-400 transition-colors duration-200"
                    onClick={addTodo}
                >
                    {icons.AddCircleOutlineRounded}
                </button>
            </div>
            <motion.ul className="absolute top-[80px] w-[91%] h-[calc(100vh-115px)] rounded-lg flex flex-col items-start m-[18px] overflow-y-auto no-scrollbar" layout>
                <AnimatePresence>
                    {global.todoList.map((todo) => (
                        <motion.li
                            key={todo.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            layout
                            className="flex items-center w-full mb-2 bg-gray-700 p-2 rounded-lg shadow-md transition-shadow duration-200 hover:shadow-lg"
                        >
                            <div className="flex items-center mr-2 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                                <span
                                    className={`w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center transition-colors duration-200 ${
                                        todo.done ? "bg-green-500 border-green-500" : "bg-gray-700"
                                    }`}
                                >
                                    {todo.done && <span className="w-3 h-3 rounded-full bg-gray-700" />}
                                </span>
                            </div>
                            {global.editingTodoId === todo.id ? (
                                <input
                                    type="text"
                                    defaultValue={todo.text}
                                    className="flex-grow text-left ml-1 bg-gray-700 text-gray-200"
                                    autoFocus
                                    onBlur={(e) => editTodo(todo.id, e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            editTodo(todo.id, e.currentTarget.value);
                                        }
                                    }}
                                />
                            ) : (
                                <motion.span
                                    key={todo.id}
                                    className="flex-grow text-left ml-1"
                                    initial={{ textDecoration: "none", color: "gray-200" }}
                                    animate={{
                                        textDecoration: todo.done ? "line-through" : "none",
                                        color: todo.done ? "gray-600" : "gray-200",
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {todo.text}
                                </motion.span>
                            )}
                            <div className="ml-2 opacity-0 hover:opacity-100 transition-opacity">
                                <button
                                    className=" text-white hover:text-gray-400 transition-colors duration-200 mr-2"
                                    onClick={() =>
                                        setGlobalKey("editingTodoId", global.editingTodoId === todo.id ? null : todo.id)
                                    }
                                >
                                    {icons.ModeEditOutlineRounded}
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-600 transition-colors duration-200"
                                    onClick={() => removeTodo(todo.id)}
                                >
                                    {icons.DeleteOutlineRounded}
                                </button>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>
        </div>
    );
};

export default TodoMenu;
