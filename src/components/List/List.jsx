import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import { formatType } from "../../utility/formatType";

import ListHeader from "./ListHeader";
import NewTaskForm from "../Task/NewTaskForm";
import NewTaskButton from "./NewTaskButton";

function List({ children, type }) {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const isLargeScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <li
      className={`${type} flex flex-col items-center gap-5 p-4 pr-0 rounded-xl shadow-lg  overflow-x-hidden overflow-y-auto dark:hover:shadow-gray-300/35 duration-200 max-sm:h-120`}
    >
      <ListHeader
        type={formatType(type)}
        setShowTaskForm={setShowTaskForm}
        showTaskForm={showTaskForm}
        isLargeScreen={isLargeScreen}
      />
      {showTaskForm && (
        <NewTaskForm formType={type} setShowTaskForm={setShowTaskForm} />
      )}
      {children}
      {!isLargeScreen && (
        <NewTaskButton
          setShowTaskForm={setShowTaskForm}
          showTaskForm={showTaskForm}
        />
      )}
    </li>
  );
}

export default List;
