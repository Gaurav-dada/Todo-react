
import { useState } from "react";

function FilterTodo({ newarr }) {
    const [currinput, setInput] = useState("");
    const [filterTodo, setFilter] = useState([]);

    function handleFilter() {
        setFilter(
            newarr.filter(
                (item) =>
                    item.tasks.toLowerCase() ===
                    currinput.toLowerCase()
            )
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                    Search TODO
                </h1>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search Your Todo"
                        value={currinput}
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleFilter();
                            }
                        }}
                        className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <button
                        onClick={handleFilter}
                        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                    >
                        Search
                    </button>
                </div>

                <div className="mt-6 space-y-3">
                    {filterTodo.length > 0 ? (
                        filterTodo.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
                            >
                                <p className="break-words font-medium text-gray-800">
                                    {item.tasks}
                                </p>

                                <span
                                    className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${
                                        item.activity
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {item.activity
                                        ? "Completed"
                                        : "Pending"}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="py-4 text-center text-gray-500">
                            No matching todos found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FilterTodo;