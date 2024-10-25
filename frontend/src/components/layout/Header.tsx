import React from 'react';
import { Menu, Bell, Search, User, Power, Divide } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './Translator';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Dropdown from '../ui/Dropdown';

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
  };

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

          <Dropdown position="bottom-right">
            <Dropdown.Toggle>
              <button className="relative rounded-lg p-2 hover:bg-gray-100">
                <User className="h-5 w-5" />
              </button>
            </Dropdown.Toggle>
            <Dropdown.Content>
              <div className="min-w-[150px] max-w-[150px]">
                <div className="border-b p-3 text-xl font-bold dark:border-gray-800 dark:text-gray-300">
                  {t('Account')}
                </div>
                <div className="grid">
                  <Link
                    className="flex items-start gap-1.5 border-b p-3 last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-950"
                    to="/profile"
                  >
                    <span className="icon-information h-fit rounded-full bg-amber-100 text-2xl text-amber-600" />
                    <div className="grid">
                      <p className="text-gray-800 dark:text-white">
                        {t('Profile')}
                      </p>
                    </div>
                  </Link>

                  <button
                    className="flex items-start gap-1.5 border-b p-3 last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-950"
                    onClick={handleLogout}
                  >
                    <span className="icon-information h-fit rounded-full bg-amber-100 text-2xl text-amber-600" />
                    <div className="grid">
                      <p className="text-gray-800 dark:text-white">
                        {t('Logout')}
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};
