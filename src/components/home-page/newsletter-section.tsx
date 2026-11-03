"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  Heart,
  Mail,
  Send,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

const benefits = [
  {
    icon: CalendarDays,
    text: "Updates on upcoming social welfare events",
  },
  {
    icon: Users,
    text: "Community stories and volunteer highlights",
  },
  {
    icon: Heart,
    text: "Ways to support drives and causes you care about",
  },
];

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Subscribed successfully! 🎉");
    setEmail("");
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 md:px-0">
      <div className="bg-gradient-to-r from-green-700 to-green-600 w-full rounded-2xl p-8 md:p-12">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: text + benefits */}
          <div className="max-w-xl space-y-5 text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Mail className="h-5 w-5 text-white" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-green-100">
                Newsletter
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Stay Connected With Our Community
            </h2>

            <p className="text-white/90">
              Join hands to support underprivileged communities, organize winter
              clothing drives, or create social welfare events — get every
              update delivered straight to your inbox.
            </p>

            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li
                  key={benefit.text}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <benefit.icon className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-sm text-white/90">
                    {benefit.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: subscribe form */}
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubscribe}
              className="rounded-2xl bg-white/10 p-6 space-y-4"
            >
              <p className="text-white font-semibold text-center">
                Subscribe to our newsletter
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-10 bg-white/95 text-green-900 placeholder:text-green-900/50 border-0 flex-1"
                />
                <Button
                  type="submit"
                  className="h-10 bg-white text-green-800 hover:bg-green-50 font-semibold shrink-0"
                >
                  <Send className="mr-1" /> Subscribe
                </Button>
              </div>
              <p className="text-xs text-center text-white/70">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
