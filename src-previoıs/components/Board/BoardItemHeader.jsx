import { useDispatch } from "react-redux";
import { deleteBoard } from "../../features/boards/boardSlice";

import thrashBinIcon from "../../assets/trash-bin-sharp.svg";

function BoardItemHeader({ boardName, id }) {
  const dispatch = useDispatch();

  function handleDeleteBoard(e) {
    e.stopPropagation();
    dispatch(deleteBoard(id));
  }

  return (
    <header className="relative  bg-primary rounded-t-xl w-full  text-center py-2 ">
      <h3 className="text-xl font-semibold text-white tracking-widest">
        {boardName}
      </h3>
      <img
        src={thrashBinIcon}
        alt={"thrash bin"}
        className="absolute w-8 mr-3 invert hover:invert-0 top-1.5 right-0 duration-200 cursor-pointer"
        onClick={handleDeleteBoard}
      ></img>
    </header>
  );
}

export default BoardItemHeader;
