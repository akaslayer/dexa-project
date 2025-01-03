import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { CalendarCheck, User } from "lucide-react";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiCaretUpDownLight } from "react-icons/pi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const menus = [
  {
    title: "Absensi Karyawan",
    url: "/admin/absensi-karyawan",
    icon: CalendarCheck,
  },
  {
    title: "Manajemen Karyawan",
    url: "/admin/manajemen-karyawan",
    icon: User,
  },
];

const AppSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { userData, fetchUserData, Logout } = useAuth();

  useEffect(() => {
    fetchUserData();
  });
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    Logout();
  };

  return (
    <Sidebar>
      <SidebarHeader className="text-center text-2xl p-5">
        Infinite
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Fitur Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((menu) => (
                <SidebarMenuItem key={menu.title}>
                  <SidebarMenuButton asChild>
                    <a href={menu.url}>
                      <menu.icon />
                      <span>{menu.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2 mb-2 hover:bg-gray-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={undefined} className="h-8 w-8" />
                  <AvatarFallback>
                    {(userData?.name.split(" ")[0]?.charAt(0) || "") +
                      (userData?.name.split(" ")[1]?.charAt(0) || "")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h1 className="text-sm font-bold line-clamp-1">
                    {userData?.name}
                  </h1>
                  <h2 className="text-xs text-gray-400">{userData?.email}</h2>
                </div>
              </div>
              <PiCaretUpDownLight size={20} />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-fit max-w-full ml-5 mb-2 lg:mb-4 lg:ml-0"
            side={isMobile ? "top" : "right"}
            align="start"
          >
            <DropdownMenuLabel>
              <div className="flex gap-4 items-center">
                <Avatar>
                  <AvatarImage src={undefined} className="h-16 w-16" />
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
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
