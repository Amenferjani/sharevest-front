import Contact from "@/components/landing/Contact";
import GrowthFunds from "@/components/landing/GrowthFunds";
import Hero from "@/components/landing/Hero";
import Methodology from "@/components/landing/Methodology";
import Navbar from "@/components/landing/Navbar";
import Services from "@/components/landing/Services";
import Stats from "@/components/landing/Stats";
import Subsidiaries from "@/components/landing/Subsidiaries";
import Values from "@/components/landing/Values";
import Ventures from "@/components/landing/Ventures";


const LandingPage = () => {
    return (
        <div>
            <section id="navbar" className="bg-transparent">
            <Navbar />
        </section>
        <section id="home">
            <Hero />
        </section>
        <section id="about">
            <Stats />
        </section>
        <section id="subsidiaries">
            <Subsidiaries />
        </section>
        <section id="services">
            <Services />
        </section>
        <section id="methodology">
            <Methodology />
        </section>
        <section id="values">
            <Values />
        </section>
        <section id="ventures">
            <Ventures />
        </section>
        <section id="growthfunds">
            <GrowthFunds />
        </section>
        <section id="contact">
            <Contact />
            </section>
        </div>
    );
};

export default LandingPage;
