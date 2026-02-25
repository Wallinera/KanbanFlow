// src/components/UI/AppContent.jsx
import { useSelector } from "react-redux";
// removed react-beautiful-dnd to disable drag-and-drop

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
    (store) => store.boards,
  );

  return (
    <>
      {activeBoard ? (
        <ul className="grid grid-cols-3 gap-5 mt-10 h-120 pr-2 max-sm:grid-cols-1 overflow-y-scroll noScrollbar">
          {activeBoard.lists.map((list) => (
            <List key={list.type} type={list.type}>
              <TaskList listType={list.type}>
                {list.tasks?.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
              </TaskList>
            </List>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-3 gap-5 mt-10 overflow-y-scroll noScrollbar h-120 pr-2 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {boards.map((board) => (
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
      )}
    </>
  );
}
