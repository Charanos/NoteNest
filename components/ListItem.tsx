"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";

interface ListItemProps {
  name: string;
  href: string;
  image: string;
}

const ListItem: React.FC<ListItemProps> = ({ name, href, image }) => {
  const router = useRouter();
  const onClick = () => {
    // add auth
    router.push(href);
  };

  return (
    <div>
      <button
        onClick={onClick}
        className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-[100px]"
      >
        <div className="relative min-h-[64px] min-w-[64px] grid place-items-center ">
          <Image src={image} alt="liked" height={40} width={40} />
        </div>
        <p className="font-medium truncate py-5">{name}</p>
        <div className="absolute transition opacity-0 rounded-full grid place-content-center bg-secondaryColor/70 p-3 mr-1 drop-shadow-md right-1 group-hover:opacity-100 hover:scale-110">
          <FaPlay className="text-betaColor" />
        </div>
      </button>
    </div>
  );
};

export default ListItem;
