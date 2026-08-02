import Categories from "@/components/shared/Categories";
import FeaturedProperties from "@/components/shared/FeaturedProperties";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/Hero";
import Navbar from "@/components/shared/Navbar";
import Stats from "@/components/shared/Stats";
import Testimonials from "@/components/shared/Testimonials";
import WhyChooseUs from "@/components/shared/WhyChooseUs";


export default function HomePage() {
  return (
    <>

      <Hero />
      <Stats />
      <Categories />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </>
  );
}