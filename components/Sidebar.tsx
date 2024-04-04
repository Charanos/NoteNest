"use client";

import Box from "./Box";
import { Song } from "@/types";
import Library from "./Library";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import SidebarItem from "./SidebarItem";
import { twMerge } from "tailwind-merge";
import { BiSearch } from "react-icons/bi";
import usePlayer from "@/hooks/usePlayer";
import { usePathname } from "next/navigation";

interface SidebareProps {
  songs: Song[];
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebareProps> = ({ songs, children }) => {
  const player = usePlayer();
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
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && "md:h-[calc(100%-80px)]"
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2 bg-betaColor">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
