"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import DropdownProfile from "./dropdown";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const UserProfile = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const userInfo = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logout");
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  return (
    <div>
      {userInfo ? (
        <div className="flex gap-3 items-center">
          
          <HoverCard>
            <HoverCardTrigger delay={100} closeDelay={200}>
             <DropdownProfile
            userName={userInfo.name}
            userEmail={userInfo.email}
            userImage={userInfo.image ?? ""}
          />
            </HoverCardTrigger>
            <HoverCardContent side="left" align="center" className="flex max-w-30 flex-col gap-0.5">{userInfo.name}</HoverCardContent>
          </HoverCard>

          <Button onClick={handleLogout} className="bg-green-800 rounded-md">
            <LogOut /> Logout
          </Button>
        </div>
      ) : (
        <Link href="login">
          <Button className="bg-green-800 rounded-md">
            <LogIn /> Login
          </Button>
        </Link>
      )}
    </div>
  );
};

export default UserProfile;
