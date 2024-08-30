import React, { useState } from 'react';
import clsx from 'clsx';
import { Button } from "../../components/ui/button";
import { LockLineIcon } from "./icons";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Blog', href: '#' },
  ];

  return (
    <header className="bg-white font-hubot">
      <div className="mx-auto sm:px-6 lg:px-0">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img className="h-8 w-auto" src="logo.png" alt="Logo" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/*<button className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              Sign Up
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">
              Log In
            </button>*/}
            <Button variant={"outline"} size={"sm"} className="rounded-[0.6rem] shadow-[#375DFB14] border border-green-800 flex justify-center items-center p-2 gap-1">
              <LockLineIcon  />
              Client Login
            </Button>
            <Button variant={"ghost"} className="rounded-[0.6rem] shadow-[#375DFB14] border border-[#FFFFFF1F] bg-[#C1FA6B] flex justify-center items-center p-2 px-[10px]">
              Schedule Appointment
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={clsx('h-6 w-6', isMenuOpen ? 'hidden' : 'block')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={clsx('h-6 w-6', isMenuOpen ? 'block' : 'hidden')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={clsx('md:hidden', isMenuOpen ? 'block' : 'hidden')}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <button className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md text-base font-medium text-[#03713A] border-[#03713A] bg-white border">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.25 8.5H16C16.1989 8.5 16.3897 8.57902 16.5303 8.71967C16.671 8.86032 16.75 9.05109 16.75 9.25V16.75C16.75 16.9489 16.671 17.1397 16.5303 17.2803C16.3897 17.421 16.1989 17.5 16 17.5H4C3.80109 17.5 3.61032 17.421 3.46967 17.2803C3.32902 17.1397 3.25 16.9489 3.25 16.75V9.25C3.25 9.05109 3.32902 8.86032 3.46967 8.71967C3.61032 8.57902 3.80109 8.5 4 8.5H4.75V7.75C4.75 7.06056 4.8858 6.37787 5.14963 5.74091C5.41347 5.10395 5.80018 4.5252 6.28769 4.03769C6.7752 3.55018 7.35395 3.16347 7.99091 2.89963C8.62787 2.6358 9.31056 2.5 10 2.5C10.6894 2.5 11.3721 2.6358 12.0091 2.89963C12.646 3.16347 13.2248 3.55018 13.7123 4.03769C14.1998 4.5252 14.5865 5.10395 14.8504 5.74091C15.1142 6.37787 15.25 7.06056 15.25 7.75V8.5ZM4.75 10V16H15.25V10H4.75ZM9.25 11.5H10.75V14.5H9.25V11.5ZM13.75 8.5V7.75C13.75 6.75544 13.3549 5.80161 12.6517 5.09835C11.9484 4.39509 10.9946 4 10 4C9.00544 4 8.05161 4.39509 7.34835 5.09835C6.64509 5.80161 6.25 6.75544 6.25 7.75V8.5H13.75Z" fill="#03713A"/>
              </svg>
              <span>Client Login</span>
            </button>
          </div>
          <div className="mt-3 flex items-center px-5">
            <button className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 bg-[#C1FA6B] hover:bg-gray-200">
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;