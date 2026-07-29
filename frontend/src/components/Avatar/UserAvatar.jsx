import React from 'react';

export const UserAvatar = ({ name = "User", size = "w-8 h-8" }) => {
  return (
    <div className={`${size} rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xs shadow-md`}>
      {name[0]}
    </div>
  );
};
