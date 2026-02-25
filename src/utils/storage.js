const KEY = "kanbanflow_boards_v1";

export function loadBoards() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("loadBoards error", e);
    return null;
  }
}

export function saveBoards(boards) {
  try {
    localStorage.setItem(KEY, JSON.stringify(boards));
  } catch (e) {
    console.error("saveBoards error", e);
  }
}

export function saveOrUpdateBoard(board) {
  try {
    const boards = loadBoards() || [];
    const idx = boards.findIndex((b) => b.id === board.id);
    if (idx === -1) boards.push(board);
    else boards[idx] = board;
    saveBoards(boards);
  } catch (e) {
    console.error("saveOrUpdateBoard error", e);
  }
}

export function removeBoard(id) {
  try {
    const boards = loadBoards() || [];
    const filtered = boards.filter((b) => b.id !== id);
    saveBoards(filtered);
  } catch (e) {
    console.error("removeBoard error", e);
  }
}
