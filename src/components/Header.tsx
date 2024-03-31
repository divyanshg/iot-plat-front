import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Menu, Transition } from '@headlessui/react';

import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <header className="flex flex-row items-center justify-between h-16 px-4 border-b border-gray-100 shrink-0 md:px-6">
      <nav className="flex-row items-center hidden gap-5 text-sm font-medium divide-x divide-gray-200 sm:flex lg:gap-6">
        <Link className="font-bold" to="#">
          <img
            className="w-[220px] h-[60px] mr-2 rounded-xl py-1 bg-white px-2"
            src="https://manavrachna.edu.in/wp-content/uploads/2022/09/newmrlogo-scaled.jpg"
            alt="logo"
          />
        </Link>
      </nav>
      {isAuthenticated && user ? (
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-black rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                <div className="flex items-center w-full gap-2 md:ml-auto md:gap-2 lg:gap-2">
                  <Button
                    className="flex flex-row items-center ml-auto rounded-full"
                    size="icon"
                    variant="ghost"
                  >
                    <img
                      alt="Avatar"
                      className="border rounded-full"
                      height="32"
                      src={
                        user?.picture ??
                        "https://api.dicebear.com/7.x/adventurer/svg"
                      }
                      style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                  <div className="flex flex-col items-start">
                    <span>{user?.name}</span>
                    <span>{user?.email}</span>
                  </div>
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? "bg-red-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
