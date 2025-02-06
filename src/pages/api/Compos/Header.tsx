import React from "react";
import { IOSSwitch } from "./Switcher";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Redux/ReduxStore";
import { HandleClick } from "./Redux/Redux";

const Header: React.FC = () => {
  const initial = useSelector((state: RootState) => state.mainReducer.initial);
  const dispatch = useDispatch();

  return (
    <div
      className={`sticky top-0 w-full bg-opacity-90 p-4 z-50 shadow-md transition-all ease-in-out duration-300 
        ${initial ? "bg-black text-white" : "bg-slate-400 text-black"}`}
    >
      <div className="max-w-screen-xl flex items-center justify-between px-6 sm:px-10">
        <h1 className="text-xl sm:text-3xl font-semibold cursor-pointer hover:text-yellow-400 transition-all ease-in-out">
          Credits
        </h1>
        <h1 className="text-xl sm:text-3xl font-semibold cursor-pointer text-center hover:text-yellow-400 transition-all ease-in-out">
          About
        </h1>
        <div className="flex items-center space-x-4">
          <IOSSwitch onClick={() => dispatch(HandleClick())} />
        </div>
      </div>
    </div>
  );
};

export default Header;
