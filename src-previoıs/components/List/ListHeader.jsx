export default function ListHeader({ type, setShowTaskForm, showTaskForm }) {
  const emoji = `${
    type === "To Do" ? "📝" : type === "In Progress" ? "⏳" : "✅"
  }`;

  return (
    <header className="flex items-center justify-between w-full pr-4">
      <h3 className="text-xl font-semibold">
        {type} {emoji}
      </h3>

      <button
        className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-700 duration-300 cursor-pointer"
        onClick={() => setShowTaskForm((state) => !state)}
      >
        {showTaskForm ? "Close Form" : "+ Add New Task"}
      </button>
    </header>
  );
}
