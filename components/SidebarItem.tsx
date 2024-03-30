import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  label,
  active,
  icon: Icon,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row items-center h-auto capitalize w-full gap-x-4 text-md font-medium cursor-pointer hover:text-accentColor2 transition py-1`,
        active && "text-secondaryColor"
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full ">{label}</p>
    </Link>
  );
};

export default SidebarItem;
