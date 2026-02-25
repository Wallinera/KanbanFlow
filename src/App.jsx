// src/App.jsx
import AppHeader from "./components/UI/AppHeader";
import AppLayout from "./components/UI/AppLayout";
import AppContent from "./components/UI/AppContent";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "./features/boards/boardSlice";
import { useEffect } from "react";
// drag-and-drop removed
import AppFooter from "./components/UI/AppFooter";

function App() {
  const dispatch = useDispatch();
  const { activeBoard } = useSelector((store) => store.boards);

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  return (
    <AppLayout>
      <AppHeader />
      <AppContent />
      <AppFooter />
    </AppLayout>
  );
}

export default App;
