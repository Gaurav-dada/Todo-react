import { useEffect, useState } from 'react'

import './App.css'
import Header from './Components/Header'
import Body from './Components/Body'
import TodoPreview from './Components/TodoPreview'
import FilterTodo from './Components/FilterTodo'

function App() {
    const arr = []

    const [savedData] = useState(() => {
        const data = localStorage.getItem("todo")
        return data ? JSON.parse(data) : null
    })

    const [currarr, setNewArr] = useState(() => savedData?.newarr ?? [])
    const newarr = [...arr, ...currarr]

    const [inputData, setInputData] = useState("")
    const [editInput, setEditInput] = useState("")
    const [activity, setActivity] = useState(() => savedData?.activity ?? {})

    useEffect(() => {
        localStorage.setItem(
            "todo",
            JSON.stringify({ newarr, activity })
        )
    }, [newarr, activity])

    function handle(lisss) {
        if (editInput !== "") {
            setNewArr((prev) =>
                prev.map((item, index) =>
                    index === editInput - arr.length ? lisss : item
                )
            )
            setEditInput('')
        } else {
            setNewArr((prev) => [...prev, lisss])
        }

        setInputData("")
    }

    function handleEdit(item, index) {
        setInputData(item)
        setEditInput(index)
    }

    function handleDelete(index, liss) {
        if (index >= arr.length) {
            setNewArr((prev) =>
                prev.filter((item, i) => i !== index - arr.length)
            )
        }
    }

    function checkHandle(index) {
        setActivity((prev) => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">

                {/* Dashboard heading */}
                <div className="mb-8 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 p-6 text-white shadow-xl sm:p-8">
                    <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-300">
                        Stay organized
                    </p>

                    <h1 className="text-3xl font-extrabold sm:text-4xl">
                        Todo Dashboard
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                        Manage your tasks, track your progress, and stay
                        productive every day.
                    </p>
                </div>

                {/* Add todo */}
                <section className="mb-6 rounded-2xl bg-white p-5 shadow-md sm:p-6">
                    <h2 className="mb-4 text-xl font-bold text-slate-800">
                        Add a Task
                    </h2>

                    <Header
                        listss={handle}
                        edit={editInput}
                        inputData={inputData}
                        setInputData={setInputData}
                    />
                </section>

                {/* Preview and search */}
                <div className="mb-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">

                    <section className="min-w-0 rounded-2xl bg-white p-5 shadow-md sm:p-6">
                        <h2 className="mb-4 text-xl font-bold text-slate-800">
                            Todo Preview
                        </h2>

                        <TodoPreview
                            todoprev={newarr}
                            activity={activity}
                        />
                    </section>

                    <section className="min-w-0 rounded-2xl bg-white p-5 shadow-md sm:p-6">
                        <h2 className="mb-4 text-xl font-bold text-slate-800">
                            Find a Task
                        </h2>

                        <FilterTodo newarr={newarr} />
                    </section>

                </div>

                {/* Task list */}
                <section className="rounded-2xl bg-white p-5 shadow-md sm:p-6">
                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-slate-800">
                            Your Tasks
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            View, edit, delete, and complete your tasks.
                        </p>
                    </div>

                    <Body
                        listsss={newarr}
                        edit={handleEdit}
                        delet={handleDelete}
                        checkHandle={checkHandle}
                        activity={activity}
                    />
                </section>

                {/* Footer */}
                <footer className="py-6 text-center text-sm text-slate-500">
                    Made for better productivity.
                </footer>

            </div>
        </div>
    )
}

export default App