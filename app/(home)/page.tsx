import { About } from "./_components/About";
import { Cta } from "./_components/Cta";
import { FAQ } from "./_components/FAQ";
import { Features } from "./_components/Features";
import { Footer } from "./_components/Footer";
import { Hero } from "./_components/Hero";
import { HowItWorks } from "./_components/HowItWorks";
import { Navbar } from "./_components/Navbar";
import { Newsletter } from "./_components/Newsletter";
import { ScrollToTop } from "./_components/ScrollToTop";
import { Services } from "./_components/Services";
import { Team } from "./_components/Team";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="px-10 sm:px-8 md:px-0">
        <Hero />
        <About />
        <HowItWorks />
        <Features />
        <Services />
        <Cta />        
        <Team />
        <Newsletter />
        <FAQ />
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
