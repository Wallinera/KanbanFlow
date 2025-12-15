export function formatType(type) {
  switch (type) {
    case "toDo":
      return "To Do";
    case "inProgress":
      return "In Progress";
    case "done":
      return "Done";

    default:
      break;
  }
}
