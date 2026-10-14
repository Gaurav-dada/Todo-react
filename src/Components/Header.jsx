function Header({ listss, inputData, setInputData, edit }) {
    function handleClick() {
        if (!inputData.trim()) return;

        listss(inputData);
        setInputData("");
    }

    return (
        <div className="mx-auto mb-6 w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
            <h1 className="mb-5 text-center text-3xl font-bold text-gray-800">
                ToDo List
            </h1>

            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="text"
                    placeholder="Enter ToDo list..."
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleClick();
                    }}
                    className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <button
                    onClick={handleClick}
                    className={`rounded-lg px-6 py-3 font-semibold text-white transition active:scale-95 ${
                        edit
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {edit ? "Update" : "ADD"}
                </button>
            </div>
        </div>
    );
}

export default Header;