import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Hero from "../components/Hero";
import Vaultcomponent from "../components/Vaultcomponent";
import Footer from "../components/Footer";
const Home = () => {
  useEffect(() => {
    const urls = [
      `${import.meta.env.VITE_SERVER}/`,
      `${import.meta.env.VITE_VAULT}/`,
    ];

    Promise.all(urls.map((url) => fetch(url).catch(() => {})))
      .then(() => {
        toast.success("All services are awake!");
      })
      .catch(() => {
        toast.error("Failed to ping some services");
      });
  }, []);

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
