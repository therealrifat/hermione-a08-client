import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

interface IGalleryItem {
  image: string;
  title: string;
  category: string;
  tall?: boolean;
}

const galleryData: IGalleryItem[] = [
  {
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80",
    title: "Blood Donation Campaign",
    category: "Health & Wellness",
  },
  {
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    title: "Food Distribution Drive",
    category: "Community & Culture",
    tall: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    title: "Tree Plantation Program",
    category: "Environment",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    title: "Book Donation Workshop",
    category: "Education",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    title: "Community Volunteer Meetup",
    category: "Community & Culture",
    tall: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1569437061241-a848be43cc82?auto=format&fit=crop&w=800&q=80",
    title: "Park & Street Cleanup",
    category: "Environment",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    title: "Community Volunteer Meetup",
    category: "Community & Culture",
    tall: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1569437061241-a848be43cc82?auto=format&fit=crop&w=800&q=80",
    title: "Park & Street Cleanup",
    category: "Environment",
  },
];

const GallerySection = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 md:px-0">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="flex items-center justify-center gap-2">
          <Camera className="h-5 w-5 text-green-600" />
          <span className="text-xs font-semibold uppercase tracking-widest text-green-600">
            Our Gallery
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">
          Moments From Our Community
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Glimpses of the community service events our volunteers have organized
          and joined together.
        </p>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-40 md:auto-rows-[200px]">
        {galleryData.map((item, ind) => (
          <div
            key={ind}
            className={`group relative overflow-hidden rounded-2xl ${
              item.tall ? "row-span-2" : "row-span-1"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="inline-block rounded-full bg-green-600 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                {item.category}
              </span>
              <h3 className="mt-1.5 text-sm md:text-base font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
