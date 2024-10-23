import React from 'react';
import { Menu, Bell, Search, User, Power } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleLogout = () => {
    if (confirm('Are you sure want to logout ? ')) {
      logout();
    }
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link to="/" className="select-none text-xl font-bold">
            {t('appName')}
          </Link>
        </div>

        <div className="mx-4 hidden max-w-md flex-1 items-center md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button className="relative rounded-lg p-2 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <Link to={"/profile"} className="rounded-lg p-2 hover:bg-gray-100">
            <User  className="h-5 w-5" />
          </Link>

          <button className="rounded-lg p-2 hover:bg-gray-100">
            <Power onClick={handleLogout} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
