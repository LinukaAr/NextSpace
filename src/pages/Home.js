import React, { useState } from "react";
import Navbar from "../components/navbar";
import Search from "../components/search";
import Display from "../components/display";
import Footer from "../components/footer"

function Home() {
  const [searchParams, setSearchParams] = useState({});

  return (
    <>
      <Navbar />
      <Search setSearchParams={setSearchParams} />
      {/* <Display searchParams={searchParams} /> */}
      <Footer/>
    </>
  );
}

export default Home;
