import { useSelector } from "react-redux";

import BoardItem from "../Board/BoardItem";
import BoardItemHeader from "../Board/BoardItemHeader";
import BoardItemContent from "../Board/BoardItemContent";
import BoardItemListItem from "../Board/BoardItemListItem";
import NewBoardForm from "../Board/NewBoardForm";

import List from "../List/List";

import TaskList from "../Task/TaskList";
import Task from "../Task/Task";

export default function AppContent() {
  const { boards, activeBoard, showNewBaordForm } = useSelector(
    (store) => store.boards
  );

  return (
    <ul
      className={`grid grid-cols-3 gap-5 mt-10 ${
        activeBoard ? "" : "overflow-y-scroll"
      } h-120 pr-2`}
    >
      {activeBoard
        ? activeBoard.lists.map((list) => (
            <List key={list.type} type={list.type}>
              <TaskList>
                {list.tasks?.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </TaskList>
            </List>
          ))
        : boards.map((board) => (
            <BoardItem key={board.id} id={board.id}>
              <BoardItemHeader boardName={board.boardName} id={board.id} />
              <BoardItemContent>
                {board.lists.map((boardItemList) => (
                  <BoardItemListItem
                    key={boardItemList.type}
                    type={boardItemList.type}
                    taskName={
                      boardItemList.tasks[0]
                        ? boardItemList.tasks[0].taskName
                        : "Add Task"
                    }
                  />
                ))}
              </BoardItemContent>
            </BoardItem>
          ))}
      {showNewBaordForm && <NewBoardForm />}
    </ul>
  );
}
