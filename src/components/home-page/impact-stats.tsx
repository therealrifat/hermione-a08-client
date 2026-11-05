import React from "react";
import {
  Building2,
  CalendarCheck,
  HandHeart,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    icon: CalendarCheck,
    value: "1,200+",
    label: "Events Organized",
  },
  {
    icon: HandHeart,
    value: "3,500+",
    label: "Volunteers Joined",
  },
  {
    icon: Building2,
    value: "85+",
    label: "Communities Served",
  },
  {
    icon: Sparkles,
    value: "12,000+",
    label: "Lives Impacted",
  },
];

const ImpactStats = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 md:px-0">
      <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl bg-gradient-to-r from-green-700 to-green-600 overflow-hidden">
        {stats.map((stat, ind) => (
          <div
            key={stat.label}
            className={[
              "flex flex-col items-center gap-3 px-6 py-10 text-center border-white/15",
              // 2x2 on mobile: right border on the left column, bottom border on the top row
              ind % 2 === 0 ? "border-r" : "",
              ind < 2 ? "border-b md:border-b-0" : "",
              // 4 across on desktop: right border on all but the last column
              ind < 3 ? "md:border-r" : "",
            ].join(" ")}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <stat.icon className="h-5 w-5 text-white" />
            </span>
            <p className="text-3xl md:text-4xl font-bold text-white">
              {stat.value}
            </p>
            <p className="text-sm text-white/75">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactStats;
