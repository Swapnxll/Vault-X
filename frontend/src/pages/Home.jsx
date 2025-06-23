import React from "react";
import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";

import Hero from "../components/Hero";
import Vaultcomponent from "../components/Vaultcomponent";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Hero />
      <div className="relative w-full border-y-2 border-black  overflow-hidden">
        {/* Small screens: short text */}
        <div className="block md:hidden text-black font-vault font-bold  py-1 px-2 text-center text-md">
          • 5.4B credentials leaked • 9.3B accounts exposed
        </div>

        {/* Medium and larger screens: full text */}
        <div className="hidden md:block text-black font-vault font-bold whitespace-nowrap py-4 px-6 text-center text-4xl">
          • 5.4B credentials leaked • 12.7M breaches recorded • 9.3B accounts
          exposed •
        </div>
      </div>

      <Vaultcomponent />
      <Footer />
    </>
  );
};

export default Home;
