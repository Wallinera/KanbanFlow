function BoardItemContent({ children }) {
  return (
    <div className="flex gap-3 p-5 w-full rounded-b-xl bg-gray-200 cursor-pointer hover:bg-gray-300 duration-300">
      {children}
    </div>
  );
}

export default BoardItemContent;
