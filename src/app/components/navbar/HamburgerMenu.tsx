"use client";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-custom-black hover:text-gray-700 focus:outline-none sm:hidden"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      <Transition
        show={isOpen}
        enter="transition-transform duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="fixed inset-0 bg-white h-80 shadow-lg z-50">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center mt-10">
            <a
              href="#"
              className="py-2 px-4 text-lg text-gray-700 hover:bg-gray-200 w-full text-center"
            >
              Home
            </a>
            <a
              href="#"
              className="py-2 px-4 text-lg text-gray-700 hover:bg-gray-200 w-full text-center"
            >
              About
            </a>
            <a
              href="#"
              className="py-2 px-4 text-lg text-gray-700 hover:bg-gray-200 w-full text-center"
            >
              Services
            </a>
            <a
              href="#"
              className="py-2 px-4 text-lg text-gray-700 hover:bg-gray-200 w-full text-center"
            >
              Contact
            </a>
          </nav>
        </div>
      </Transition>
    </div>
  );
};

export default HamburgerMenu;
