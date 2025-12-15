import { useDispatch } from "react-redux";
import { setActiveBoard } from "../../features/boards/boardSlice";

export default function BoardItem({ children, id }) {
  const dispatch = useDispatch();
  function handleBoardItem() {
    dispatch(setActiveBoard(id));
  }

  return (
    <li
      className="flex flex-col items-center rounded-b-xl shadow-lg  h-fit "
      onClick={handleBoardItem}
    >
      {children}
    </li>
  );
}
