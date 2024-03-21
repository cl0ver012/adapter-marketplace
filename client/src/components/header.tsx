import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { logout } from "../redux/features/auth/authSlice";
import Switcher from "../utils/themeSwitcher";
import PolkadotWalletButton from "./polkadot-wallet-button/index";
import MetamaskWalletButton from './metamask-wallet-button'

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-[10vh] w-screen bg-gray-200 dark:bg-neutral-800 flex items-center justify-between px-10">
      <div className="flex items-center">
        {/* User Avatar */}
        <div className="flex items-center justify-center w-12 h-12 bg-gray-400 rounded-full cursor-pointer relative">
          <Icon icon="ooui:user-active" width="24" height="24" />
        </div>
        {/* Explore Button */}
        <div className="flex items-center gap-[1px]">
          <button
            type="button"
            onClick={() => navigate("/bots")}
            className="ml-8 px-4 py-2 bg-blue-500 dark:bg-neutral-900 text-white rounded-l-full cursor-pointer hover:bg-blue-600 hover:dark:bg-neutral-700 transition ease-in-out duration-150"
          >
            Explore
          </button>
          {/* Fine Tuning Button */}
          <button
            type="button"
            onClick={() => navigate("/select-model")}
            className="px-4 py-2 bg-green-500 dark:bg-neutral-900 text-white rounded-r-full cursor-pointer hover:bg-green-600 hover:dark:bg-neutral-700 transition ease-in-out duration-150"
          >
            Fine Tuning
          </button>
        </div>
      </div>
      <div className="flex items-center">
        {/* Toggle darkmode */}
        <div className="flex mr-5">
          <Switcher />
        </div>
        <div className=' mr-5'>
          <MetamaskWalletButton />
        </div>
        <div className=' mr-5'>
          <PolkadotWalletButton />
        </div>
        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            className="w-80 pl-10 pr-4 py-2 rounded-full outline-none ring-1 ring-gray-300 focus:ring-gray-500"
            placeholder="Search..."
          />
          <div className="absolute top-0 left-0 mt-2 ml-3">
            <Icon
              icon="lets-icons:search-duotone-line"
              width="24"
              height="24"
            />
          </div>
        </div>

        <button
          onClick={handleLogout}
          type="button"
          className="ml-4 w-[40px] h-[40px] text-neutral-800 dark:text-white uppercase rounded-full hover:shadow-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:bg-neutral-300 dark:focus:bg-neutral-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out flex items-center justify-center whitespace-nowrap motion-reduce:transition-none"
        >
          <Icon
            icon="icon-park:logout"
            width="24"
            height="24"
            className="cursor-pointer icon-with-theme"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
