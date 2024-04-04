"use client";

import Button from "./Button";
import toast from "react-hot-toast";
import { HiHome } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { useUser } from "@/hooks/useUser";
import { IoSearch } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import UseAuthModal from "@/hooks/UseAuthModal";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const { user } = useUser();
  const router = useRouter();
  const authModal = UseAuthModal();
  const supabaseClient = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    // TODO: Refresh any currently playing songs

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-accentColor p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button className="rounded-full bg-betaColor flex items-center justify-center ">
            <RxCaretLeft
              size={35}
              onClick={() => router.back()}
              className="text-textColor hover:opacity-75 transition"
            />
            <RxCaretRight
              size={35}
              onClick={() => router.forward()}
              className="text-textColor hover:opacity-75 transition"
            />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2  bg-betaColor flex items-center justify-center">
            <HiHome
              size={20}
              className="text-textColor hover:opacity-75 transition "
            />
            <IoSearch
              size={20}
              className="text-textColor hover:opacity-75 transition ml-5"
            />
          </button>
        </div>

        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogout}
                className="bg-betaColor hover:text-textColor px-6 py-1.5 text-textColor/80"
              >
                Logout
              </Button>

              <Button
                className="rounded-full px-2.5 py-2.5 hover:bg-secondaryColor"
                onClick={() => router.push("/account")}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              {/* <div>
              <Button
                onClick={authModal.onOpen}
                className="bg-transparent text-textColor hover:text-secondaryColor"
              >
                Sign Up
              </Button>
            </div> */}
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-secondaryColor px-6 py-1.5"
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
