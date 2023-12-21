// ./src/components/bars/sidebarContext.tsx
import React, { ReactNode, useState } from 'react';

interface SidebarContentProps {
  children: ReactNode;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ children }) => {
  // Use useState or other client-side functionality here if needed

  return <div className="flex">{children}</div>;
};

export default SidebarContent;
