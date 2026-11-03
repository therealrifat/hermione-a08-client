import Image from "next/image";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import UserProfile from "../profile/user-profile";

const Navbar = () => {
  return (
    <div className="bg-green-100 dark:bg-gray-900 py-2">
      <div className="flex gap-5 max-w-7xl mx-auto justify-between items-center px-2">
        <Link href={"/"}>
          <div className="flex items-center gap-2">
            <Image
              src="/image/bondhub.png"
              width={45}
              height={45}
              alt="logo"
            ></Image>
            <div className="hidden md:flex flex-col">
              <h1 className="text-xl font-bold text-[#059669]">
                Bond<span className="text-[#EA580C]">Hub</span>{" "}
              </h1>
              <span className=" text-[10px] font-semibold">
                Connect. Care. Change
              </span>
            </div>
          </div>
        </Link>

        <Link href="/events" className="md:mr-40 text-[#059669] flex gap-2">
          <CalendarDays /> Upcoming Event
        </Link>

        <div className="flex gap-5">
          <ModeToggle />
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
