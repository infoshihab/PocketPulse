import React from "react";
import Navbar from "../components/Navbar";
import { Banner } from "../components/Banner";
import { About } from "../components/About";
import { Service } from "../components/Service";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex flex-col flex-1">
        <section id="banner" className="w-full">
          <Banner />
        </section>

        <section
          id="about"
          className="w-full py-16 md:py-24 px-4 md:px-12 bg-gray-50"
        >
          <About />
        </section>

        <section
          id="service"
          className="w-full py-16 md:py-24 px-4 md:px-12 bg-white"
        >
          <Service />
        </section>

        <section
          id="contact"
          className="w-full py-16 md:py-24 px-4 md:px-12 bg-gray-50"
        >
          <Contact />
        </section>
      </main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
