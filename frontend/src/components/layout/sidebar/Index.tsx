import React from 'react';
import {
  Home,
  CircleCheckBig,
  Settings,
  UsersRound,
  CirclePlus,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Item from './Item';
import Divider from '../../Divider';
import WorkspaceSwitcher from '../WorkspaceSwitcher';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const navItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: t('dashboard'),
      path: '/dashboard',
    },
    {
      icon: <CircleCheckBig className="h-5 w-5" />,
      label: t('My Tasks'),
      path: '/dashboard/tasks',
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: t('settings'),
      path: '/dashboard/settings',
    },
    {
      icon: <UsersRound className="h-5 w-5" />,
      label: t('Members'),
      path: '/dashboard/members',
    },
  ];

  return (
    <aside
      className={`
        fixed top-16 bottom-0 left-0 z-40
        w-64 bg-gray-50 border-r border-gray-200 shadow-lg
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
    >
      <div className="px-4 py-1">
        <div className="mb-3 flex items-center justify-between text-sm font-semibold text-gray-700">
          <span>Workspace</span>
          <button
            onClick={() => navigate('/dashboard/workspaces/create')}
            className="ml-2 rounded-lg p-2 hover:bg-gray-100"
            title="Create Workspace"
          >
            <CirclePlus className="h-5 w-5" />
          </button>
        </div>

        <WorkspaceSwitcher />

        <Divider className="my-4" />
      </div>

      <nav className="flex flex-col">
        <div className="space-y-1 px-3">
          {navItems.map((item, index) => (
            <Item
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path}
            />
          ))}
        </div>
      </nav>

      <div className="px-4 py-1">
        <Divider className="my-4" />
      </div>
    </aside>
  );
};

export default Sidebar;
