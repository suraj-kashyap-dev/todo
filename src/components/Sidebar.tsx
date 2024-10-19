import React from 'react';
import { Home, Calendar, Star, CheckCircle, Settings, FolderOpen, Copy } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: t('dashboard'), path: '/' },
    { icon: <Calendar className="h-5 w-5" />, label: t('today'), path: '/today' },
    { icon: <Star className="h-5 w-5" />, label: t('important'), path: '/important' },
    { icon: <CheckCircle className="h-5 w-5" />, label: t('completed'), path: '/completed' },
    { icon: <FolderOpen className="h-5 w-5" />, label: t('projects'), path: '/projects' },
    { icon: <Settings className="h-5 w-5" />, label: t('settings'), path: '/settings' },
    { icon: <Copy className="h-5 w-5" />, label: t('example'), path: '/example' },
  ];

  return (
    <aside className={`
      fixed top-16 bottom-0 left-0 z-40
      w-64 bg-white border-r border-gray-200
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      <nav className="h-full py-4 flex flex-col">
        <div className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg
                ${location.pathname === item.path 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
};