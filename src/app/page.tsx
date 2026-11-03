import Banner from "@/components/home-page/banner";
import FeatureSection from "@/components/home-page/feature-section";
import GallerySection from "@/components/home-page/gallery-section";
import NewsletterSection from "@/components/home-page/newsletter-section";
import RecentUpcomingEvent from "@/components/home-page/recent-upcoming-event";






export default function Home() {
  return (
    <div>
      <Banner/>
      <FeatureSection/>
      <RecentUpcomingEvent/>
      <GallerySection/>
      <NewsletterSection/>

      


    </div>
  );
}
