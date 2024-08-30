import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { ActionIcon } from "./icons";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="font-hubot antialiased px-2 -mx-6 border-b border-[#CDE3D8] bg-white text-white py-2 z-50">
        <nav className="flex justify-between items-center px-6">
            <span className="">
                <img src="logo.png" alt="logo" />
            </span>
            {/* Desktop Navigation */}
            <ul className="hidden md:flex text-black">
                <li className="p-4 hover:bg-[#F9FEF0]">
                    <a href="#" className="">Application</a>
                </li>
                <li className="p-4">
                    <a href="#" className="">Appointment</a>
                </li>
                <li className="p-4">
                    <a href="#" className="">Account & Settings</a>
                </li>
            </ul>
            {/* Desktop User Profile */}
            <div className="hidden space-x-3 md:flex items-center">
                <span>
                    <ActionIcon />
                </span>
                <div className="py-2 px-2 space-x-1 flex items-center border rounded-lg">
                    <Avatar className="bg-[#ff6b6b] text-white">
                        <AvatarImage src="/avatars/avatar5.png" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <p className="text-black">CurrentUser</p>
                    <div className="p-1">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12.25L5.5 7.75H14.5L10 12.25Z" fill="#525866"/>
                        </svg>
                    </div>
                </div>
            </div>
            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMenu}>
                <svg className="w-6 h-6 text-black" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
            </button>
        </nav>
        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden bg-white absolute top-14 left-0 right-0 z-50">
                <ul className="text-black">
                    <li className="p-4 hover:bg-[#F9FEF0]">
                        <a href="#" className="">Application</a>
                    </li>
                    <li className="p-4 hover:bg-[#F9FEF0]">
                        <a href="#" className="">Appointment</a>
                    </li>
                    <li className="p-4 hover:bg-[#F9FEF0]">
                        <a href="#" className="">Account & Settings</a>
                    </li>
                </ul>
                <div className="p-4 flex items-center justify-between border-b">
                    <div className="flex items-center border  rounded-lg px-2 space-x-2">
                        <Avatar className="bg-[#ff6b6b] text-white w-6 h-6">
                            <AvatarImage src="/avatars/avatar5.png" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <p className="text-black">CurrentUser</p>
                        <div className="p-1">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 12.25L5.5 7.75H14.5L10 12.25Z" fill="#525866"/>
                            </svg>
                        </div>
                    </div>
                    <ActionIcon  />
                </div>
            </div>
        )}
    </header>
  )
}
