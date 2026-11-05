import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, CalendarSearch, House } from "lucide-react";

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      <div className="mt-16 mb-16 flex flex-col items-center gap-3 rounded-2xl border bg-green-50/50 px-6 py-16 text-center dark:bg-green-950/40">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/40">
          <CalendarSearch className="h-7 w-7 text-green-600 dark:text-green-400" />
        </span>

        <span className="text-7xl font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
          404
        </span>

        <h1 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-400">
          Page Not Found
        </h1>
        <p className="max-w-md text-muted-foreground">
          Looks like this event has wandered off. The page you&apos;re looking
          for doesn&apos;t exist or may have been moved.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link href="/">
            <Button className="bg-green-700 hover:bg-green-800 h-10 w-full sm:w-auto">
              <House /> Back to Home
            </Button>
          </Link>
          <Button
            variant="outline"
            className="text-green-800 dark:text-green-400 h-10 w-full sm:w-auto"
            render={<Link href="/events" />}
          >
            <CalendarDays /> Explore Events
          </Button>
        </div>

        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
          Error 404 · BondHub
        </p>
      </div>
    </div>
  );
};

export default NotFound;
