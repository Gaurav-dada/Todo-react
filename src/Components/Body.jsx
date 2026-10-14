import {useState} from 'react'

function Body({ listsss, edit, delet ,checkHandle,activity }) {
    
    return (
        <div className="w-full overflow-x-auto rounded-xl bg-white p-4 shadow-lg sm:p-6">
            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="bg-gray-100 text-gray-700">
                        <th className="border-b px-4 py-3 font-semibold">
                            Lists
                        </th>
                        <th className="border-b px-4 py-3 text-center font-semibold text-gray-700">
                            Activity
                        </th>
                        <th className="border-b px-4 py-3 text-center font-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listsss.map((lis, index) => (
                        <tr
                            key={index}
                            className="border-b transition-colors hover:bg-gray-50"
                        >
                            <td className="px-4 py-3 text-gray-800">
                                {lis}
                            </td>
                          <td className="px-4 py-3 text-center">
    <div className="flex items-center justify-center gap-2">
        <input
            type="checkbox"
            checked={!!activity[index]}
            onChange={()=>checkHandle(index)}
            
            className="h-4 w-4 cursor-pointer"
        />

        <span className={activity[index] ? "text-green-600" : "text-gray-500"}>
            {activity[index] ? "Completed" : "Pending"}
        </span>
    </div>
</td>

                            <td className="px-4 py-3">
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => edit(lis, index)}
                                        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 active:scale-95"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => delet(index, lis)}
                                        className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95"
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
                                colSpan="2"
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                No lists available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Body;