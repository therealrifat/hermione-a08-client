import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const socials = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Create Event", href: "/events/create" },
  { label: "My Joined Events", href: "/events/joined" },
];

const categories = [
  "Education",
  "Environment",
  "Health & Wellness",
  "Community & Culture",
];

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-2.5 mb-4">
    <h4 className="text-base font-bold text-white">{children}</h4>
    <span className="block h-0.5 w-10 rounded-full bg-gradient-to-r from-green-400 to-orange-400" />
  </div>
);

const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-b from-green-950 via-[#062c1c] to-green-950 text-white">
      {/* Top accent hairline */}
      <div className="h-1 bg-gradient-to-r from-green-600 via-orange-500 to-green-600" />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/image/bondhub.png"
                width={45}
                height={45}
                alt="BondHub logo"
              />
              <h3 className="text-xl font-bold">
                Bond<span className="text-[#EA580C]">Hub</span>
              </h3>
            </Link>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-green-400">
              Connect. Care. Change.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              A social development events platform bringing compassionate
              people together to organize and join initiatives that matter.
            </p>

            <div className="mt-5 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-green-800"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:justify-self-center">
            <SectionHeading>Quick Links</SectionHeading>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-green-400"
                  >
                    <span className="inline-block -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="md:justify-self-center lg:justify-self-center">
            <SectionHeading>Categories</SectionHeading>
            <ul className="space-y-2.5">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href="/events"
                    className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-green-400"
                  >
                    <span className="inline-block -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <SectionHeading>Get in Touch</SectionHeading>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-green-400" />
                support@bondhub.com
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-green-400" />
                +880 1XXX-XXXXXX
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                Dhaka, Bangladesh
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/50">
              We usually reply within 24 hours.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
          <p>© 2026 BondHub — Social Development Events Platform</p>
          <p>Made with 💚 for community volunteers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
