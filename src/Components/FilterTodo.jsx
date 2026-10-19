
import { useState, useEffect } from "react";

function FilterTodo({ newarr, checkHandle }) {
    const [currinput, setInput] = useState("");
    const [filterTodo, setFilter] = useState(null);

    function handleFilter() {
        setFilter(
            newarr.filter((item) =>
                item.tasks.toLowerCase().includes(
                    currinput.trim().toLowerCase()
                )
            )
        );
    }

    // Keep visible search results in sync with updated parent data.
    useEffect(() => {
        if (filterTodo !== null) {
            setFilter((prev) =>
                prev === null
                    ? null
                    : prev.map((oldItem) =>
                          newarr.find(
                              (item) => item.id === oldItem.id
                          ) ?? oldItem
                      )
            );
        }
    }, [newarr]);

    async function handleCheck(id) {
        await checkHandle(id);
    }

    return (
        <div className="w-full">
            <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                    Search TODO
                </h1>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search Your Todo"
                        value={currinput}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setFilter(null);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleFilter();
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

                {filterTodo !== null && (
                    <div className="mt-6 space-y-3">
                        {filterTodo.length > 0 ? (
                            filterTodo.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
                                >
                                    <input
                                        type="checkbox"
                                        checked={Boolean(item.activity)}
                                        onChange={() => handleCheck(item.id)}
                                        className="h-5 w-5 shrink-0 cursor-pointer accent-green-600"
                                    />

                                    <p
                                        className={`min-w-0 flex-1 break-words font-medium ${
                                            item.activity
                                                ? "text-gray-400 line-through"
                                                : "text-gray-800"
                                        }`}
                                    >
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
                )}
            </div>
        </div>
    );
}

export default FilterTodo;