
import { useEffect, useState } from "react";

import Header from "./Components/Header";
import Body from "./Components/Body";
import TodoPreview from "./Components/TodoPreview";
import FilterTodo from "./Components/FilterTodo";

function App() {
    const API = "http://127.0.0.1:8000/lists";

    const [currarr, setNewArr] = useState([]);
    const [inputData, setInputData] = useState("");
    const [editInput, setEditInput] = useState("");
    const [activity, setActivity] = useState({});
    const [currsignal, setSignal] = useState(false);
    const [editid, setEditid] = useState("");

    const newarr = [...currarr];

    async function fetcher() {
        try {
            const res = await fetch(API);

            if (!res.ok) {
                throw new Error("Failed to fetch todos");
            }

            const data = await res.json();
            setNewArr(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    useEffect(() => {
        fetcher();
    }, []);

    async function edit(id) {
        setEditid(id);

        try {
            const res = await fetch(`${API}/${id}`);

            if (!res.ok) {
                throw new Error("Failed to fetch todo");
            }

            const response = await res.json();

            setEditInput(response.tasks);
            setInputData(response.tasks);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function delet(id) {
        try {
            const res = await fetch(`${API}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete todo");
            }

            await fetcher();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function checkHandle(id) {
        try {
            const res = await fetch(`${API}/${id}`);

            if (!res.ok) {
                throw new Error("Failed to get todo");
            }

            const response = await res.json();
            const updatedActivity = !response.activity;

            const updateRes = await fetch(`${API}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    activity: updatedActivity,
                }),
            });

            if (!updateRes.ok) {
                throw new Error("Failed to update todo");
            }

            await fetcher();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Dashboard Header */}
                <header className="mb-8 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-10 text-white shadow-lg sm:px-10">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                        Stay organized
                    </p>

                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                        Todo Dashboard
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                        Manage your tasks, track your progress,
                        and stay productive every day.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <div className="rounded-lg bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                            Total Tasks: {currarr.length}
                        </div>

                        <div className="rounded-lg bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                            Completed:{" "}
                            {currarr.filter(
                                (task) => task.activity
                            ).length}
                        </div>

                        <div className="rounded-lg bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                            Pending:{" "}
                            {currarr.filter(
                                (task) => !task.activity
                            ).length}
                        </div>
                    </div>
                </header>

                {/* Add Task */}
                <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-slate-800">
                            Add a Task
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Create a new task or update an existing one.
                        </p>
                    </div>

                    <Header
                        inputData={inputData}
                        setInputData={setInputData}
                        fetcher={fetcher}
                        signal={currsignal}
                        setSignal={setSignal}
                        editid={editid}
                    />
                </section>

                {/* Preview and Search */}
                <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

                    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                        <div className="mb-5">
                            <h2 className="text-xl font-bold text-slate-800">
                                Todo Preview
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Check your current task progress.
                            </p>
                        </div>

                        <TodoPreview
                            todoprev={newarr}
                            activity={activity}
                        />
                    </section>

                    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                        <div className="mb-5">
                            <h2 className="text-xl font-bold text-slate-800">
                                Find a Task
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Search your tasks by name.
                            </p>
                        </div>

                        <FilterTodo newarr={newarr}
                        checkHandle={checkHandle} />
                    </section>
                </div>

                {/* Tasks Table */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-800">
                            Your Tasks
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            View, edit, delete, and complete your tasks.
                        </p>
                    </div>

                    <Body
                        listsss={newarr}
                        edit={edit}
                        delet={delet}
                        setSignal={setSignal}
                        checkHandle={checkHandle}
                    />
                </section>

                {/* Footer */}
                <footer className="py-8 text-center text-sm text-slate-500">
                    Made for better productivity.
                    <p className="mt-1 text-xs text-slate-400">
                        Stay focused. One task at a time.
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default App;