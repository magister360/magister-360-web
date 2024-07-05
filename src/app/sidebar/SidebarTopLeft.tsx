"use client"
import React, { useMemo } from "react";

import SidebarLeft from "./SidebarLeft";
import SidebarTop from "./Sidebar";
import { useSidebarContext } from "./SidebarContext";

const SidebarTopLeft: React.FC = () => {
  const { visibleSidebar } = useSidebarContext();

  const sidebarContent = useMemo(() => {
    if (visibleSidebar) {
      return (
        <>
          <SidebarTop />
          <SidebarLeft />
        </>
      );
    }
    return null;
  }, [visibleSidebar]);

  return <>{sidebarContent}</>;
};

export default SidebarTopLeft;
