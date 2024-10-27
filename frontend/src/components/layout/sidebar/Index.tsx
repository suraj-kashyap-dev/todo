import React from 'react';
import {
  Home,
  Calendar,
  Star,
  CheckCircle,
  Settings,
  FolderOpen,
  Copy,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Item from './Item';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { t } = useTranslation();

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: t('dashboard'), path: '/dashboard' },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: t('today'),
      path: '/dashboard/today',
    },
    {
      icon: <Star className="h-5 w-5" />,
      label: t('important'),
      path: '/dashboard/important',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      label: t('completed'),
      path: '/dashboard/completed',
    },
    {
      icon: <FolderOpen className="h-5 w-5" />,
      label: t('projects'),
      path: '/dashboard/projects',
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: t('settings'),
      path: '/dashboard/settings',
    },
    {
      icon: <Copy className="h-5 w-5" />,
      label: t('example'),
      path: '/dashboard/example',
    },
  ];

  return (
    <aside
      className={`
      fixed top-16 bottom-0 left-0 z-40
      w-64 bg-white border-r border-gray-200
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}
    >
      <nav className="flex h-full flex-col py-4">
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
    </aside>
  );
};
