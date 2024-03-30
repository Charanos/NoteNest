"use client";

import Box from "./Box";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import SidebarItem from "./SidebarItem";
import { BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Library from "./Library";

interface SidebareProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebareProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        href: "/",
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
      },
      {
        href: "/search",
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2 bg-betaColor">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
