"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = () => {
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();

  const userInfo = session?.user;

//   const handleLogout= async()=>{
//     await authClient.signOut();
//   }

  return (
    <div>
      {userInfo ? (
        <div className="flex gap-3 items-center">
          <Avatar size="lg">
            <AvatarImage src={userInfo.image as string} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Link href="login">
            <Button  className="bg-green-800 rounded-md">
              <LogOut /> Logout
            </Button>
          </Link>
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
