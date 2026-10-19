
function Body({ listsss, edit, delet, setSignal, checkHandle }) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-md">
            <table className="w-full min-w-[500px] border-collapse text-left">
                <thead>
                    <tr className="bg-gray-100 text-sm uppercase tracking-wider text-gray-600">
                        <th className="px-6 py-4 font-semibold">
                            Lists
                        </th>

                        <th className="px-6 py-4 text-center font-semibold">
                            Activity
                        </th>

                        <th className="px-6 py-4 text-center font-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {listsss.map((lis, index) => (
                        <tr
                            key={lis.id ?? index}
                            className="transition hover:bg-gray-50"
                        >
                            <td className="break-words px-6 py-4 font-medium text-gray-800">
                                {lis.tasks}
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={lis.activity}
                                        onChange={() =>
                                            checkHandle(lis.id)
                                        }
                                        className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-600 focus:ring-2 focus:ring-blue-300"
                                    />

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            lis.activity
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {lis.activity
                                            ? "Completed"
                                            : "Pending"}
                                    </span>
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => {
                                            edit(lis.id);
                                            setSignal(true);
                                        }}
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => delet(lis.id)}
                                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 active:scale-95"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {listsss.length === 0 && (
                        <tr>
                            <td
                                colSpan={3}
                                className="px-6 py-10 text-center text-gray-500"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-3xl">
                                        📝
                                    </span>
                                    <p className="font-medium">
                                        No lists available.
                                    </p>
                                    <p className="text-sm">
                                        Add a task to get started!
                                    </p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Body;