import { useRef } from "react"
import { useGlobal } from "../hooks/Global"
import { icons } from "../constants/icons"
import { AnimatePresence, motion } from "framer-motion"

const TodoMenu = () => {
    const todoInputRef = useRef<HTMLInputElement>(null)
    const { global, setGlobalKey } = useGlobal()

    const toggleTodoMenu = () => {
        setGlobalKey("isTodoOpen", !global.isTodoOpen)
    }

    const addTodo = () => {
        if (todoInputRef.current && todoInputRef.current.value.trim()) {
            const newTodo = {
                text: todoInputRef.current.value.trim(),
                done: false,
                id: Date.now(),
            }
            setGlobalKey("todoList", [...global.todoList, newTodo])
            todoInputRef.current.value = ""
        }
    }

    const editTodo = (id: number, newText: string) => {
        if (!newText.trim()) {
            removeTodo(id)
            return
        }
        setGlobalKey("editingTodoId", null)
        setGlobalKey(
            "todoList",
            global.todoList.map((todo) =>
                todo.id === id ? { ...todo, text: newText.trim() } : todo,
            ),
        )
    }

    const removeTodo = (id: number) => {
        setGlobalKey(
            "todoList",
            global.todoList.filter((todo) => todo.id !== id),
        )
    }

    const toggleTodo = (id: number) => {
        setGlobalKey(
            "todoList",
            global.todoList.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo,
            ),
        )
    }

    const completedCount = global.todoList.filter((todo) => todo.done).length
    const totalCount = global.todoList.length

    return (
        <>
            {/* Menu Container */}
            <div
                className={`absolute top-[3px] left-0 h-[calc(100vh-6px)] w-[26rem] sm:w-[30.7rem] shadow-2xl transition-all duration-300 rounded-[24px] z-50 ${
                    global.isTodoOpen
                        ? "translate-x-[4px]"
                        : "-translate-x-full"
                }`}
                style={{
                    backgroundColor: "var(--bg-color)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
            >
                {/* Header Section */}
                <div className="absolute top-[16px] left-[20px] w-[calc(100%-40px)]">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-100">
                        My Tasks
                    </h2>
                    {totalCount > 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-2 text-sm"
                        >
                            <span className="text-gray-400">
                                {completedCount}/{totalCount}
                            </span>
                            <div className="w-16 h-2 bg-second rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-prim"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${(completedCount / totalCount) * 100}%`,
                                    }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Input Section */}
                <div className="relative flex items-center">
                    <input
                        ref={todoInputRef}
                        className="w-full h-12 px-4 pr-12 bg-second text-txt placeholder-gray-500 rounded-xl border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-prim focus:border-transparent transition-all duration-200"
                        type="text"
                        placeholder="Add a new task..."
                        autoComplete="off"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                addTodo()
                            }
                        }}
                    />
                    <motion.button
                        className="absolute right-2 text-prim hover:text-txt transition-colors duration-200 p-2 rounded-lg"
                        onClick={addTodo}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {icons.AddRoundedIcon}
                    </motion.button>
                </div>
            </div>

            {/* Todo List */}
            <motion.ul
                className="absolute top-[120px] w-[calc(100%-40px)] h-[calc(100vh-155px)] left-[20px] flex flex-col gap-2 overflow-y-auto no-scrollbar px-1"
                layout
            >
                <AnimatePresence mode="popLayout">
                    {global.todoList.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-full text-gray-500"
                        >
                            <svg
                                className="w-20 h-20 mb-4 opacity-30"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            <p className="text-sm">No tasks yet</p>
                            <p className="text-xs mt-1">
                                Add one to get started!
                            </p>
                        </motion.div>
                    ) : (
                        global.todoList.map((todo, index) => (
                            <motion.li
                                key={todo.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20, height: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.05,
                                }}
                                layout
                                className={`group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 border hover:shadow-lg ${
                                    todo.done
                                        ? "bg-second/40 border-gray-700/20"
                                        : "bg-second border-gray-700/30 hover:border-prim/30"
                                }`}
                            >
                                {/* Checkbox */}
                                <motion.div
                                    className="flex-shrink-0 cursor-pointer mt-0.5"
                                    onClick={() => toggleTodo(todo.id)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div
                                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                                            todo.done
                                                ? "bg-prim border-prim"
                                                : "border-gray-500 hover:border-prim"
                                        }`}
                                    >
                                        {todo.done && (
                                            <motion.svg
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-4 h-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </motion.svg>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Todo Text */}
                                <div className="flex-grow min-w-0">
                                    {global.editingTodoId === todo.id ? (
                                        <input
                                            type="text"
                                            defaultValue={todo.text}
                                            className="w-full text-left bg-bg text-txt px-3 py-1 rounded-lg border border-prim focus:outline-none focus:ring-2 focus:ring-prim"
                                            autoFocus
                                            onBlur={(e) =>
                                                editTodo(todo.id, e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    editTodo(
                                                        todo.id,
                                                        e.currentTarget.value,
                                                    )
                                                }
                                                if (e.key === "Escape") {
                                                    setGlobalKey(
                                                        "editingTodoId",
                                                        null,
                                                    )
                                                }
                                            }}
                                        />
                                    ) : (
                                        <motion.span
                                            className={`block text-left text-[15px] select-none cursor-pointer transition-colors duration-300 break-words pr-2 ${
                                                todo.done
                                                    ? "text-gray-500 line-through"
                                                    : "text-gray-200"
                                            }`}
                                            onClick={() => toggleTodo(todo.id)}
                                            animate={{
                                                opacity: todo.done ? 0.6 : 1,
                                            }}
                                        >
                                            {todo.text}
                                        </motion.span>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 self-start mt-0.5">
                                    <motion.button
                                        className="p-2 text-gray-400 hover:text-prim hover:bg-second rounded-lg transition-all duration-200"
                                        onClick={() =>
                                            setGlobalKey(
                                                "editingTodoId",
                                                global.editingTodoId === todo.id
                                                    ? null
                                                    : todo.id,
                                            )
                                        }
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {icons.ModeEditOutlineRounded}
                                    </motion.button>
                                    <motion.button
                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-second rounded-lg transition-all duration-200"
                                        onClick={() => removeTodo(todo.id)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {icons.DeleteOutlineRounded}
                                    </motion.button>
                                </div>
                            </motion.li>
                        ))
                    )}
                </AnimatePresence>
            </motion.ul>
            </div>

            {/* Toggle Button - Minimal Design */}
            <motion.div
                className={`fixed top-1/2 -translate-y-1/2 z-[60] cursor-pointer transition-all duration-300 group ${
                    global.isTodoOpen ? "left-[26.5rem] sm:left-[31.2rem]" : "left-0"
                }`}
                onClick={toggleTodoMenu}
                whileHover={{ scale: 1.05, x: global.isTodoOpen ? -3 : 3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div
                    className={`flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                        global.isTodoOpen
                            ? "w-8 h-16 rounded-l-xl"
                            : "w-10 h-20 rounded-r-xl"
                    }`}
                >
                    <motion.div
                        animate={{ rotate: global.isTodoOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400 group-hover:text-gray-200 transition-colors"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}

export default TodoMenu
