export default function TaskList({ children }) {
  return (
    <ul className="flex flex-col items-center justify-start h-85 w-full gap-5 pr-2 pb-2  overflow-y-auto">
      {children}
    </ul>
  );
}
