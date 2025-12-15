export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col w-300 text-black my-40 rounded-xl shadow-lg border border-gray-200 p-4 pb-10">
      {children}
    </div>
  );
}
