import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setActiveBoard } from "../../features/boards/boardSlice";

function AppBoardInfo() {
  const { boards, activeBoard } = useSelector((store) => store.boards);
  const dispatch = useDispatch();

  function handleSelectBoard(id) {
    if (activeBoard?.id === id) return;
    dispatch(setActiveBoard(id));
  }

  return (
    <div
      className={`flex items-center gap-2 text-xl max-sm:justify-center ${
        activeBoard && "max-sm:flex-col"
      } `}
    >
      {activeBoard ? (
        <form>
          <label
            className="font-semibold mr-3 text-center 
           max-sm:block max-sm:mb-2"
          >
            Selected Board:
          </label>
          <select
            value={activeBoard.id}
            onChange={(e) => handleSelectBoard(e.target.value)}
            className="bg-gray-200 dark:bg-gray-500 rounded-full text-center focus:outline-none px-4 py-1 "
          >
            {boards.map((board) => (
              <option
                value={board.id}
                key={board.id}
                className="dark:bg-gray-300 dark:text-black"
              >
                {board.boardName}
              </option>
            ))}
          </select>
        </form>
      ) : (
        <>
          <h2 className="font-semibold">Total Boards:</h2>
          <p>{boards.length}</p>
        </>
      )}
    </div>
  );
}

export default AppBoardInfo;
