import AppHeader from "./components/UI/AppHeader";
import AppLayout from "./components/UI/AppLayout";
import AppContent from "./components/UI/AppContent";
import { useDispatch } from "react-redux";
import { getBoards } from "./features/boards/boardSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(
    function () {
      dispatch(getBoards());
    },

    [dispatch]
  );

  return (
    <AppLayout>
      <AppHeader />
      <AppContent />
    </AppLayout>
  );
}

export default App;
