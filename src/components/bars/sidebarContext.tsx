import React, { ReactNode, useState } from 'react';

interface SidebarContentProps {
  children: ReactNode;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ children }) => {
  return <div className="flex">{children}</div>;
};

export default SidebarContent;
