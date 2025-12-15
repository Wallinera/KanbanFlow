import { useState } from "react";
import { formatType } from "../../utility/formatType";

import ListHeader from "./ListHeader";
import NewTaskForm from "../Task/NewTaskForm";

function List({ children, type }) {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <li
      className={`${type} flex flex-col items-center gap-5 p-4 pr-0 rounded-xl shadow-lg  overflow-x-hidden overflow-y-auto`}
    >
      <ListHeader
        type={formatType(type)}
        setShowTaskForm={setShowTaskForm}
        showTaskForm={showTaskForm}
      />
      {showTaskForm && (
        <NewTaskForm formType={type} setShowTaskForm={setShowTaskForm} />
      )}
      {children}
    </li>
  );
}

export default List;
