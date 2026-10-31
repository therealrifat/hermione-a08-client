"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Router from "next/router";

const UserProfile = () => {
  const {
    data: session,
  } = authClient.useSession();

  const userInfo = session?.user;

  const handleLogout= async()=>{
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      Router.push("/login"); // redirect to login page
    },
  },
});
  }

  return (
    <div>
      {userInfo ? (
        <div className="flex gap-3 items-center">
          <Avatar size="lg">
            <AvatarImage src={userInfo.image as string} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Link href="login">
            <Button onClick={handleLogout} className="bg-green-800 rounded-md">
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
