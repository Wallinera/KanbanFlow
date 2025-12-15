import { useDispatch, useSelector } from "react-redux";
import {
  setActiveBoard,
  boardFormToggle,
} from "../../features/boards/boardSlice";
import { Activity, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { toggleDarkMode } from "../../features/ui/uiSlice";

import gridIcon from "../../assets/grid.svg";
import hamburgerIcon from "../../assets/menu-sharp.svg";
import moonIcon from "../../assets/moon-sharp.svg";
import sunIcon from "../../assets/sunny-sharp.svg";
import AppBoardInfo from "./AppBoardInfo";

export default function AppHeader() {
  const dispatch = useDispatch();
  const { activeBoard, showNewBaordForm } = useSelector(
    (store) => store.boards
  );
  const { darkMode } = useSelector((store) => store.ui);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });

  useEffect(
    function () {
      document.documentElement.classList.toggle("dark");
    },
    [darkMode]
  );

  function handleAddBoard() {
    if (activeBoard) dispatch(setActiveBoard());
    dispatch(boardFormToggle());
  }

  function handleDarkMode() {
    dispatch(toggleDarkMode());
  }

  function handleMenuButton() {
    setOpenMobileMenu(!openMobileMenu);
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-200 pb-5 dark:text-white max-md:h-[67px]">
      {/*App Logo Container*/}
      <div
        className={`flex items-center gap-3  cursor-pointer `}
        onClick={() => dispatch(setActiveBoard(null))}
      >
        <div className="bg-amber-500 p-2 rounded-lg">
          <img src={gridIcon} alt="logo icon" className="w-5 invert" />
        </div>
        <h1
          className={`text-3xl font-semibold  max-md:text-2xl ${
            isMobile && openMobileMenu && "hidden"
          }`}
        >
          KanbanFlow
        </h1>
      </div>

      {/*Total Boards or Active Board*/}

      <Activity mode={isMobile ? "hidden" : "visible"}>
        <AppBoardInfo />
      </Activity>

      {/*Utility Buttons Container*/}
      <div className={`flex items-center gap-5`}>
        {/*Dark/light Mode Switcher */}
        <button
          className={`group bg-gray-300   hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-700 rounded-lg duration-150  p-2.5 cursor-pointer ${
            !openMobileMenu && "max-md:hidden"
          }`}
          onClick={handleDarkMode}
        >
          <img
            src={darkMode ? sunIcon : moonIcon}
            alt="Dark Mode Toggle"
            className="w-5  group-hover:invert"
          />
        </button>
        <button
          className={`bg-blue-800 text-white font-semibold text-xl w-45 px-6 py-2 rounded-lg cursor-pointer duration-200 hover:bg-blue-500 max-md:px-4 max-md:text-lg max-lg:w-38 ${
            !openMobileMenu && "max-md:hidden"
          }`}
          onClick={handleAddBoard}
        >
          {showNewBaordForm ? "Close Form" : `+ Add Board`}
        </button>

        <button className="group hidden w-8 h-8 rounded-full bg-gray-300 p-1  cursor-pointer max-md:block ">
          <img
            src={hamburgerIcon}
            alt="Hamburger Menu"
            className={`group-hover:scale-110 duration-150 ${
              openMobileMenu && "rotate-90"
            }`}
            onClick={handleMenuButton}
          />
        </button>
      </div>
    </header>
  );
}
