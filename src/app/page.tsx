import Banner from "@/components/home-page/banner";
import ImpactStats from "@/components/home-page/impact-stats";
import FeatureSection from "@/components/home-page/feature-section";
import GallerySection from "@/components/home-page/gallery-section";
import NewsletterSection from "@/components/home-page/newsletter-section";
import RecentUpcomingEvent from "@/components/home-page/recent-upcoming-event";

export default function Home() {
  return (
    <div>
      <Banner/>
      <ImpactStats/>
      <FeatureSection/>
      <RecentUpcomingEvent/>
      <GallerySection/>
      <NewsletterSection/>
    </div>
  );
}
