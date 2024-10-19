import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
      <span className="ml-4 text-lg font-medium">Loading...</span>
    </div>
  );
};

export default Loading;
