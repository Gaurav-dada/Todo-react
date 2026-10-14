import { useState } from "react"

function FilterTodo({ newarr }) {
    const [currinput, setInput] = useState("")
    const [filterTodo, setFilter] = useState('')

    function handleFilter() {
        setFilter(newarr.filter((item) => item.toLowerCase() == currinput.toLowerCase()))
    }

    return (
        <div className="mx-auto mt-6 w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                Search TODO
            </h1>

            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="text"
                    placeholder="Search Your Todo"
                    value={currinput}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <button
                    onClick={handleFilter}
                    className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600 active:scale-95"
                >
                    Search
                </button>
            </div>

            <div className="mt-5 rounded-lg bg-gray-50 p-4">
                <p className="wrap-break-words text-gray-700">
                    {filterTodo}
                </p>
            </div>
        </div>
    )
}

export default FilterTodo