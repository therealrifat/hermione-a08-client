import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "../ui/separator";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const DropdownProfile = ({ userName,userEmail, userImage }:{userName: string, userEmail: string, userImage: string}) => {

  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger
          render={
            <Avatar size="lg">
              <AvatarImage src={userImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          }
        />
        <PopoverContent align="start" className={"max-w-50"}>
          <PopoverHeader>
            <PopoverTitle>{userName}</PopoverTitle>
            <PopoverDescription>{userEmail}</PopoverDescription>
            <Separator />
            <div className="flex flex-col  space-y-1.5">
              <Link className="flex gap-2 hover:bg-slate-100" href={"/events/create"}>
                Create Events
              </Link>
              <Link className="flex gap-2 hover:bg-slate-100" href={"/events/manage"}>
                Manage Events
              </Link>
              <Link className="flex gap-2 hover:bg-slate-100" href={"/events/joined"}>
                Joined Events
              </Link>
            </div>
            <Separator />

            <span onClick={handleLogout} className=" flex gap-1.5 cursor-pointer hover:bg-slate-100  ">
              <span><LogOut className=" scale-80" /></span> Logout
            </span>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DropdownProfile;
