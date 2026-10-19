
const API = "http://127.0.0.1:8000/lists";

function Header({ editid, inputData, setInputData,signal, setSignal, fetcher }) {
  async function addtodoback() {
    if (!signal) {
      try {
        const res = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tasks: inputData,
            activity: false,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.log("Validation details:", errorData.detail);
          return false;
        }

        const data = await res.json();
        await fetcher();

        console.log("Todo added successfully:", data);
        return true;
      } catch (error) {
        console.error("Error adding todo:", error);
        return false;
      }
    } else {
      try {
        const res = await fetch(`${API}/${editid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tasks: inputData,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.log("Validation details:", errorData.detail);
          return false;
        }

        const data = await res.json();
        await fetcher();

        console.log("Todo Updated successfully:", data);
        return true;
      } catch (error) {
        console.error("Error Updating todo:", error);
        return false;
      }
    }
  }

  async function handleClick() {
    if (!inputData.trim()) return;

    const success = await addtodoback();

    if (!success) return;
    setSignal(false)

    setInputData("");
  }

  return (
    <div className="w-full rounded-2xl bg-white p-5 sm:p-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-800">
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
          className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />

        <button
          onClick={handleClick}
          className={`rounded-xl px-7 py-3 font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 active:translate-y-0 ${
            signal
              ? "bg-amber-500 hover:bg-amber-600 focus:ring-amber-100"
              : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-100"
          }`}
        >
          {signal ? "Update" : "ADD"}
        </button>
      </div>
    </div>
  );
}

export default Header;