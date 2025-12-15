import { useState } from "react";
import { useDispatch } from "react-redux";
import { boardFormToggle, addBoard } from "../../features/boards/boardSlice";

import closeIcon from "../../assets/close-circle-sharp.svg";

function NewBoardForm() {
  const [boardName, setBoardName] = useState("");
  const dispatch = useDispatch();
  function handelSubmit(e) {
    e.preventDefault();
    const newBoard = {
      boardName: boardName,
      lists: [
        { type: "toDo", tasks: [] },
        { type: "inProgress", tasks: [] },
        { type: "done", tasks: [] },
      ],
      date: new Date(),
    };
    dispatch(addBoard(newBoard));
  }

  function handleCloseForm() {
    dispatch(boardFormToggle());
  }

  return (
    <div className="flex flex-col mt-5 bg-gray-200 rounded-xl h-fit  shadow-lg">
      <header className="relative  bg-primary rounded-t-xl w-full h-11 text-center py-2 ">
        <h3 className="text-xl font-semibold mr-5 text-white tracking-widest">
          {boardName}
        </h3>
        <img
          src={closeIcon}
          alt={"thrash bin"}
          className="absolute w-8 mr-3 invert hover:invert-0 top-1.5 right-0 duration-200 cursor-pointer"
          onClick={handleCloseForm}
        ></img>
      </header>

      <form
        className="flex flex-col gap-5 rounded-b-lg p-5"
        onSubmit={handelSubmit}
      >
        <div className="flex items-center gap-3">
          <label htmlFor="boardName" className="font-semibold">
            Board Name:
          </label>
          <input
            type="text"
            id="boardName"
            value={boardName}
            placeholder="Enter a board name..."
            className="px-3 py-1 bg-white rounded-lg placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
            onChange={(e) => setBoardName(e.target.value)}
            required
            maxLength={20}
          />
        </div>

        <button className=" px-4 py-2  mx-auto bg-primary text-white rounded-lg cursor-pointer hover:bg-secondary duration-200">
          Create Board
        </button>
      </form>
    </div>
  );
}

export default NewBoardForm;
