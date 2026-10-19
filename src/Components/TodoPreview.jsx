function TodoPreview({ todoprev }) {
    return (
        <div className="mx-auto mt-8 w-full max-w-3xl rounded-2xl bg-gray-100 p-6 shadow-lg sm:p-8">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">
                Todo Preview
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Pending Tasks */}
                <div className="rounded-xl border border-yellow-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 border-b border-yellow-100 pb-3 text-xl font-bold text-yellow-700">
                        <span>⏳</span> Pending
                        <span className="ml-auto rounded-full bg-yellow-100 px-3 py-1 text-sm">
                            {todoprev.filter((item, index) => !item.activity).length}
                        </span>
                    </h2>

                    <div className="space-y-3">
                        {todoprev
                            .filter((item, index) => !item.activity)
                            .map((item, index) => (
                                <p
                                    key={item.id}
                                    className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-gray-700 transition hover:bg-yellow-50"
                                >
                                    {item.tasks}
                                </p>
                            ))}

                        {todoprev.filter((item, index) => !item.activity).length === 0 && (
                            <p className="py-4 text-center text-sm text-gray-400">
                                No pending tasks 🎉
                            </p>
                        )}
                    </div>
                </div>

                {/* Completed Tasks */}
                <div className="rounded-xl border border-green-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 border-b border-green-100 pb-3 text-xl font-bold text-green-700">
                        <span>✅</span> Completed
                        <span className="ml-auto rounded-full bg-green-100 px-3 py-1 text-sm">
                            {todoprev.filter((item, index) => item.activity).length}
                        </span>
                    </h2>

                    <div className="space-y-3">
                        {todoprev
                            .filter((item, index) => item.activity)
                            .map((item, index) => (
                                <p
                                    key={item.id}
                                    className="rounded-lg border border-green-100 bg-green-50 p-3 text-gray-500 line-through"
                                >
                                    {item.tasks}
                                </p>
                            ))}

                        {todoprev.filter((item, index) => item.activity).length === 0 && (
                            <p className="py-4 text-center text-sm text-gray-400">
                                No completed tasks yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoPreview;