import React from 'react';

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <div
      className={`h-px w-full border border-dashed border-blue-200 ${className || ''}`}
    />
  );
};

export default Divider;
