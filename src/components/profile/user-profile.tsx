"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import DropdownProfile from "./dropdown";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession();

  const userInfo = session?.user;

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
      {userInfo ? (
        <div className="flex gap-3 items-center">
          <DropdownProfile userName={userInfo.name} userEmail={userInfo.email} userImage={userInfo.image} />

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
