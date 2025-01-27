import React, { useEffect, useState } from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50 bg-transparent">
      <div className="w-16 h-16 border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full animate-spin bg-transparent"></div>
    </div>
  );
};

export default Loader;
