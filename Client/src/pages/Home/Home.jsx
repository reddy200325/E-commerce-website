import React, { useContext } from "react";
import Hero from "@/components/Hero/Hero";
import BestSeller from "@/components/LastestCollection/BestSeller";
import HomeCollection from "@/components/HomeCollection/HomeCollection";
import { ShopContext } from "@/components/context/ShopContext";

const Home = () => {

  const { searchTerm } = useContext(ShopContext);

  return (
    <main className="w-full min-h-screen bg-gray-50">

      {!searchTerm && (
        <>
          {/* Hero section */}
          <section className="w-full px-4 sm:px-6 lg:px-12 py-6">
            <Hero />
          </section>

          {/* Best seller products */}
          <section className="w-full px-4 sm:px-6 lg:px-12 py-10">
            <BestSeller />
          </section>
        </>
      )}

      {/* Collection showcase */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-10 pb-16">
        <HomeCollection />
      </section>

    </main>
  );
};

export default Home;