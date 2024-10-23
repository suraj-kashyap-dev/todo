import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const Item: React.FC<ItemProps> = ({ icon, label, path }) => {
  const location = useLocation();

  return (
    <Link
      to={path}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg
        ${
          location.pathname === path
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Item;
