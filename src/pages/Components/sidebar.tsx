import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { DashboardIcon, CalenderIcon, TimerIcon, WalletIcon, GroupIcon, FileIcon, MailSendIcon, StarIcon, LogoutIcon} from './icons';

const NavItem = ({ icon: Icon, label, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li className="mb-2 relative hover:bg-[#F6F8FA] py-1 rounded-lg">
      <a
        href="#"
        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(label.toLowerCase())}
      >
        <Icon className="w-5 h-5 mr-2" />
        <span className="hidden md:inline">{label}</span>
      </a>
      {isHovered && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded md:hidden">
          {label}
        </div>
      )}
    </li>
  );
};

const Sidebar = ({onItemClick}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     {/*} <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded shadow"
      >
        <Menu className="w-6 h-6" />
      </button>*/}
      <div className={`fixed md:static inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition duration-200 ease-in-out md:w-64 bg-white h-auto shadow-lg z-10`}>
        <div className="p-4 border-b">
          <img src="/logo-image.png" alt="D&E Business Consulting" className="mb-2 hidden md:block w-18 h-8" />
        </div>
        <nav className="p-4 space-y-5">
          <h2 className="text-xs font-medium text-[#868C98] hidden md:block">MAIN</h2>
          <ul>
            <NavItem icon={DashboardIcon} label="Dashboard" onClick={onItemClick} />
            <NavItem icon={CalenderIcon} label="Clients" onClick={onItemClick}/>
            <NavItem icon={TimerIcon} label="Applications" onClick={onItemClick}/>
            <NavItem icon={WalletIcon} label="Payments" onClick={onItemClick}/>
            <NavItem icon={GroupIcon} label="Appointments" onClick={onItemClick} />
            <NavItem icon={FileIcon} label="Blog" onClick={onItemClick} />
            <NavItem icon={MailSendIcon} label="Newsletter" onClick={onItemClick} />
            <NavItem icon={StarIcon} label="Testimonials" onClick={onItemClick} />
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t hidden md:block">
          <div className="flex items-center">
            <img src="/public/avatars/avatar6.png" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
            <div className='flex justify-between items-center gap-2'>
                <div>
                    <p className="font-semibold text-sm">Current User</p>
                    <p className="text-xs text-gray-600">currentuser@company...</p>
                </div>              
              <LogoutIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;