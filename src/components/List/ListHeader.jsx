import NewTaskButton from "./NewTaskButton";

export default function ListHeader({
  type,
  setShowTaskForm,
  showTaskForm,
  isLargeScreen,
}) {
  const emoji = `${
    type === "To Do" ? "📝" : type === "In Progress" ? "⏳" : "✅"
  }`;

  return (
    <header className="flex items-center justify-between w-full pr-4 max-lg:justify-center">
      <h3 className="text-xl font-semibold dark:text-gray-300">
        {type} {emoji}
      </h3>
      {isLargeScreen && (
        <NewTaskButton
          setShowTaskForm={setShowTaskForm}
          showTaskForm={showTaskForm}
        />
      )}
    </header>
  );
}
