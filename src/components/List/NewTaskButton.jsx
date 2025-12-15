function NewTaskButton({ setShowTaskForm, showTaskForm }) {
  return (
    <button
      className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-700 duration-300 cursor-pointer dark:bg-primary/50 dark:hover:bg-blue-700/30"
      onClick={() => setShowTaskForm((state) => !state)}
    >
      {showTaskForm ? "Close Form" : "+ Add New Task"}
    </button>
  );
}

export default NewTaskButton;
