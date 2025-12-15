export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col w-300 text-black my-40 rounded-xl shadow-lg border border-gray-200 p-4 pb-10 max-lg:max-w-4xl max-md:max-w-2xl max-sm:max-w-sm max-sm:pb-5">
      {children}
    </div>
  );
}
