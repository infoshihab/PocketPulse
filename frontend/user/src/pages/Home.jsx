import React from "react";
import Navbar from "../components/Navbar";
import { Banner } from "../components/Banner";
import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Service } from "../components/Service";

function Home() {
  return (
    <div>
      <Navbar />
      <Banner id="banner" />
      <About id="about" />
      <Service id="service" />
      <Contact id="contact" />
      <Footer />
    </div>
  );
}

export default Home;
