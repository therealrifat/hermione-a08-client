import Banner from "@/components/home-page/banner";
import FeatureSection from "@/components/home-page/feature-section";
import GallerySection from "@/components/home-page/gallery-section";
import NewsletterSection from "@/components/home-page/newsletter-section";
import RecentUpcomingEvent from "@/components/home-page/recent-upcoming-event";
import Footer from "@/components/shared/Footer";





export default function Home() {
  return (
    <div>
      <Banner/>
      <RecentUpcomingEvent/>
      <FeatureSection/>
      <GallerySection/>
      <NewsletterSection/>

      


    </div>
  );
}
