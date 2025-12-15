import { useDispatch, useSelector } from "react-redux";
import {
  setActiveBoard,
  boardFormToggle,
} from "../../features/boards/boardSlice";

import gridIcon from "../../assets/grid.svg";

export default function AppHeader() {
  const dispatch = useDispatch();
  const { boards, activeBoard, showNewBaordForm } = useSelector(
    (store) => store.boards
  );

  function handleAddBoard() {
    if (activeBoard) dispatch(setActiveBoard());
    dispatch(boardFormToggle());
  }

  function handleSelectBoard(id) {
    if (activeBoard?.id === id) return;
    dispatch(setActiveBoard(id));
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-200   pb-5 ">
      {/*App Logo Container*/}
      <div
        className="flex items-center gap-3  cursor-pointer"
        onClick={() => dispatch(setActiveBoard(null))}
      >
        <div className="bg-amber-500 p-2 rounded-lg">
          <img src={gridIcon} alt="logo icon" className="w-5 invert" />
        </div>
        <h1 className="text-3xl font-semibold dark:text-white">KanbanFlow</h1>
      </div>

      {/*Total Boards or Active Board*/}

      <div className="flex items-center gap-2 text-xl ">
        {activeBoard ? (
          <form>
            <label className="font-semibold mr-3">Selected Board:</label>
            <select
              value={activeBoard.id}
              onChange={(e) => handleSelectBoard(e.target.value)}
              className="bg-gray-200 rounded-full text-center focus:outline-none px-4 py-1"
            >
              {boards.map((board) => (
                <option value={board.id} key={board.id}>
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

      {/*Utility Buttons Container*/}
      <div className="flex items-center gap-5 ">
        {/*Dark/light Mode Switcher "WILL BE ADDED LATER*/}
        <div className="w-4 h-4 rounded-full bg-gray-500"></div>
        <button
          className="bg-blue-800 text-white font-semibold text-xl w-45 px-6 py-2 rounded-lg cursor-pointer duration-200 hover:bg-blue-500"
          onClick={handleAddBoard}
        >
          {showNewBaordForm
            ? "Close Form"
            : `+ Add ${activeBoard ? "Board" : "Board"}`}
        </button>
      </div>
    </header>
  );
}
