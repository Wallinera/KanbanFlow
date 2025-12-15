import AppBoardInfo from "./AppBoardInfo";
import { useMediaQuery } from "react-responsive";
import { Activity } from "react";

function AppFooter() {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });

  return (
    <footer
      className={`flex flex-col gap-4 items-center w-full mt-5 justify-center dark:text-gray-300`}
    >
      <Activity mode={isMobile ? "visible" : "hidden"}>
        <AppBoardInfo />
      </Activity>

      <p>Made by Emirhan Karagöz</p>
    </footer>
  );
}

export default AppFooter;
