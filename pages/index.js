import Footer from "../components/Footer";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import * as React from "react";

import { getBlog } from "./api/Blog";
const InfoCard = dynamic(() => import("shop/infoCard"), { key: () => country });

const BlogCard = dynamic(() => import("shop/blogCard"));

const OnlineCard = dynamic(() => import("shop/onlineCard"));

// const CountrySwitcher = dynamic(() => import("shop/countrySwitcher"));

export default function Home({ blogDetail }) {
  console.log("blogDetailMain", blogDetail);
  const [country, setCountry] = React.useState(null);
  const countrySelected = JSON.parse(country);
  React.useEffect(() => {
    if (!countrySelected) return;
    const root = document.querySelector(":root");
    for (const [key, value] of Object.entries(countrySelected)) {
      if (!key.startsWith("--")) continue;
      root.style.setProperty(key, value);
    }
  }, [country]);

  return (
    <div>
      {/* <CountrySwitcher setCountry={setCountry} /> */}
      <Header />
      <main className="!bg-[var(--backgroundColor)] !text-[var(--textColor)] p-2 bg-gray-100  min-h-screen pt-16 pb-10 ">
        <div className="w-full md:max-w-screen-xl mx-auto pt-2 md:pt-4">
          <div className="w-full flex flex-cols items-start justify-between animate-fadeIn md:space-x-2">
            <InfoCard country={country} />
            {/* <InfoCard />
            <BlogCard data={data.data} />
            <OnlineCard /> */}
            <BlogCard />
            <OnlineCard />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const data = await getBlog();
  console.log(data);

  return {
    props: {
      blogDetail: data,
    },
    revalidate: 60 * 60,
  };
};
