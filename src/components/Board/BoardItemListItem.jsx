import { formatType } from "../../utility/formatType";

function BoardItemListItem({ type, taskName }) {
  return (
    <div className="flex flex-col items-center text-center justify-center w-1/2 wrap-anywhere ">
      {/*List Name*/}
      <header className="bg-secondary  rounded-t-lg w-full p-2 dark:bg-blue-900">
        <p className=" font-medium text-sm text-white max-md:text-xs">
          {formatType(type)}
        </p>
      </header>
      {/*Task Item*/}
      <div className="bg-white dark:bg-gray-400 dark:text-white w-full p-3 h-18 pb-4 rounded-b-lg ">
        <p className="line-clamp-2 max-md:text-sm">{taskName}</p>
      </div>
      {/*Dots */}
      <Dots />
    </div>
  );
}
function Dots() {
  return (
    <div className="flex flex-col gap-1 items-center justify-center mt-3">
      <div className="w-1 h-1 rounded-full bg-gray-700 dark:bg-gray-300"></div>
      <div className="w-1 h-1 rounded-full bg-gray-700 dark:bg-gray-300"></div>
      <div className="w-1 h-1 rounded-full bg-gray-700 dark:bg-gray-300"></div>
    </div>
  );
}

export default BoardItemListItem;
