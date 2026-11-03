import React from "react";
import {
  CalendarPlus,
  HandHeart,
  LayoutList,
  MoonStar,
  ShieldCheck,
  Sparkles,
  TicketCheck,
} from "lucide-react";

interface IFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  visual?: React.ReactNode;
}

const MiniChip = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700">
    {label}
  </span>
);

const featureData: IFeature[] = [
  {
    icon: CalendarPlus,
    title: "Create Events in Minutes",
    description:
      "Set the date, pick a location, and choose from categories to launch any social welfare initiative — no complicated setup.",
    className: "md:col-span-2",
    visual: (
      <div className="flex flex-wrap gap-2">
        <MiniChip label="📅 12 Dec, 2026" />
        <MiniChip label="📍 Ramna Park, Dhaka" />
        <MiniChip label="🌱 Environment" />
      </div>
    ),
  },
  {
    icon: HandHeart,
    title: "One-Click Participation",
    description:
      "Join verified community events with a single click and coordinate directly with local volunteer leaders.",
  },
  {
    icon: LayoutList,
    title: "Manage Your Events",
    description:
      "Update or remove initiatives you created and keep everything organized from one simple dashboard.",
    className: "md:row-span-2",
    visual: (
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-xl bg-white p-3 text-xs font-medium text-green-800 shadow-sm">
          Blood Donation Campaign
          <span className="text-green-600">✏️ 🗑️</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-white p-3 text-xs font-medium text-green-800 shadow-sm">
          Winter Clothing Drive
          <span className="text-green-600">✏️ 🗑️</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-white p-3 text-xs font-medium text-green-800 shadow-sm">
          Tree Plantation
          <span className="text-green-600">✏️ 🗑️</span>
        </div>
      </div>
    ),
  },
  {
    icon: TicketCheck,
    title: "My Joined Events",
    description:
      "Never miss an initiative — see every event you've joined in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Auth",
    description:
      "Sign in safely with email & password or your Google account, powered by Better Auth.",
  },
  {
    icon: MoonStar,
    title: "Light & Dark Mode",
    description:
      "Comfortable browsing day or night with the built-in theme switcher.",
  },
];

const FeatureSection = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 md:px-0">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-green-600" />
          <span className="text-xs font-semibold uppercase tracking-widest text-green-600">
            App Features
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">
          Everything You Need to Make an Impact
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Hermione gives you all the tools to organize, join, and manage
          community social welfare events.
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featureData.map((feature) => (
          <div
            key={feature.title}
            className={`group flex flex-col rounded-2xl border bg-green-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-green-200/50 ${feature.className ?? ""}`}
          >
            <span className="mb-4 flex h-11 w-11 rotate-3 items-center justify-center rounded-xl bg-green-100 text-green-700 transition-transform duration-300 group-hover:rotate-0">
              <feature.icon className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold text-green-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {feature.description}
            </p>
            {feature.visual && (
              <div className="mt-auto pt-5">{feature.visual}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
