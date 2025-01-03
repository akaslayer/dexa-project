import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { userData, fetchUserData, Logout } = useAuth();

  useEffect(() => {
    fetchUserData();
  });

  const handleLogout = () => {
    Logout();
  };

  return (
    <div className="py-5 px-10 border-[1px] shadow-md sticky  w-full top-0 z-10 bg-white">
      <nav className="flex justify-between">
        <Link
          to="/home"
          className="text-2xl font-extralight text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Infinite
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={undefined} />
                <AvatarFallback>
                  {(userData?.name.split(" ")[0]?.charAt(0) || "") +
                    (userData?.name.split(" ")[1]?.charAt(0) || "")}
                </AvatarFallback>
              </Avatar>
              <BiSolidDownArrow size={10} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit max-w-full mr-4">
            <DropdownMenuLabel>
              <div className="flex gap-4 items-center">
                <Avatar>
                  <AvatarImage src={undefined} />
                  <AvatarFallback>
                    {(userData?.name.split(" ")[0]?.charAt(0) || "") +
                      (userData?.name.split(" ")[1]?.charAt(0) || "")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h1 className="text-sm">{userData?.name}</h1>
                  <h2 className="text-xs text-gray-400">{userData?.email}</h2>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div
                className="flex justify-between items-center w-full"
                onClick={handleLogout}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-full border-[1px]">
                    <RiLogoutBoxLine size={14} />
                  </div>
                  <p>Logout</p>
                </div>
                <MdOutlineKeyboardArrowRight size={15} />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
};

export default Navbar;
