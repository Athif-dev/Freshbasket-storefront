import React, { ReactNode } from "react";
import ReduxProvider from "../store/reduxProvider";
import MobileProfile from "../components/Profile/MobileProfile";

interface SideBySideLayoutProps {
  children: ReactNode;
}

const SideBySideLayout: React.FC<SideBySideLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="hidden sm:flex mt-[3.6rem] sm:mt-[8.8rem] container h-[70vh] lg:h-[50vh] xl:h-[80vh] font-poppins">
        {/* Sidebar */}
        <aside className="w-1/5  text-custom-black p-6">
          <nav className="space-y-4">
            <ul>
              <li>
                <a
                  className='block p-2 rounded-sm 
                    hover:bg-green-100 hover:text-main-green"
                  '
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  className='block p-2 rounded-sm 
                    hover:bg-green-100 hover:text-main-green"
                  '
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  className='block p-2 rounded-sm 
                    hover:bg-green-100 hover:text-main-green"
                  '
                >
                  Wishlist
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-5 overflow-auto hide-scrollbar">
          <ReduxProvider>{children}</ReduxProvider>
        </main>
      </div>
      <div className=" sm:hidden mt-[5rem] container h-[70vh] lg:h-[50vh] xl:h-[80vh] font-poppins">
        <MobileProfile />
      </div>
    </>
  );
};

export default SideBySideLayout;
