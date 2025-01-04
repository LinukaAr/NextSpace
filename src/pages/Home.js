import React, { useState } from "react";
import Navbar from "../components/navbar";
import Search from "../components/search";
import Display from "../components/display";
import Footer from "../components/footer";
import About from "../components/about";
import Contact from "../components/contact";

function Home() {
  const [searchParams, setSearchParams] = useState({});

  return (
    <>
      <Navbar />
      <Search setSearchParams={setSearchParams} />
      {/* <Display searchParams={searchParams} /> */}
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </>
  );
}

export default Home;