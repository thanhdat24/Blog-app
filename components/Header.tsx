"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface Language {
  data: any[]; // Define the structure of 'data' property here
  // Add other properties if applicable
}

export default function Header() {
  const [isOpenNavBar, setIsOpenNavBar] = useState(false);
  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const [cookieLocale, setCookieLocale] = useState("");
  const [changeModeLanguages, setChangeModeLanguages] = useState("");
  console.log("changeModeLanguages", changeModeLanguages);
  const savedLocale = Cookies.get("locale");
  const [listLanguages, setListLanguages] = useState<Language>({ data: [] });
  const router = useRouter();
  console.log("router", router);
  // Kiểm tra xem có tồn tại tham số locale trong URL không
  const localeParam = router.query?.locale
    ? `?locale=${router.query.locale}`
    : "";
  const { id } = router.query;
  React.useEffect(() => {
    const fetchData = async () => {
      if (savedLocale) {
        setCookieLocale(savedLocale);
      }

      try {
        const res = await fetch(
          "https://q-force-wiki.hotanloc.xyz/items/languages?filter[active][_eq]=true",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setListLanguages(data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the async function

    // Optionally, return a cleanup function if needed
    // return () => {
    //   // Cleanup logic here, if applicable
    // };
  }, [savedLocale]);
  console.log("listLanguages", listLanguages);
  const handleLinkClick = (item) => {
    const currentPath = router.asPath.split("?")[0]; // Lấy path hiện tại và loại bỏ query params
    router.replace(`${currentPath}?locale=${item.code}`);
  };
  return (
    <div className="!bg-[var(--backgroundSecondary)]  bg-white   p-2 shadow border-b border-transparent z-20 fixed top-0 w-screen">
      <div className="relative max-w-[1280px] mx-auto flex justify-between items-center">
        <div className="flex space-x-4 flex-shrink-0">
          <div>
            {/* <Image
              src="/assets/img/logo-circle.png"
              alt="Logo"
              className="h-10 w-10 cursor-pointer"
            />/ */}
            <Link href="/">
              <Image
                src="/logo-circle.png"
                alt="Vercel Logo"
                className="h-10 w-10 cursor-pointer"
                width={80}
                height={10}
                priority
              />
            </Link>
          </div>
        </div>
        <div className="text-3xl text-green-500 md:flex ">
          <Link href="/">
            {" "}
            <div className="relative group border-b-4 border-transparent   border-green-500">
              <i className=" hover:bg-[var(--hoverBackgroundSecondary)] select-none py-1 px-4 md:py-2 md:px-6 rounded-lg active:bg-gray-200 transition-base cursor-pointer  bx bxs-home"></i>
              <div className="select-none animate-fadeIn group-hover:block absolute top-full left-1/2 hidden bg-black bg-opacity-60 px-1 rounded transform -translate-x-1/2 translate-y-2 text-white  text-sm font-title p-1">
                Home
              </div>
            </div>
          </Link>

          <Link href="friends">
            <div className="relative group border-b-4 border-transparent  ">
              <i className=" hover:bg-[var(--hoverBackgroundSecondary)] select-none py-1 px-4 md:py-2 md:px-6 rounded-lg active:bg-gray-200 transition-base cursor-pointer  bx bx-group"></i>
              <div className="select-none animate-fadeIn group-hover:block absolute top-full left-1/2 hidden bg-black  bg-opacity-60 px-1 rounded transform -translate-x-1/2 translate-y-2 text-white  text-sm font-title p-1">
                Friends
              </div>
            </div>
          </Link>
          <div className="relative group border-b-4 border-transparent block md:hidden ">
            <i className=" hover:bg-[var(--hoverBackgroundSecondary)] select-none py-1 px-4 md:py-2 md:px-6 rounded-lg active:bg-gray-200  transition-base cursor-pointer  bx bx-search"></i>
            <div className="select-none animate-fadeIn group-hover:block absolute top-full left-1/2 hidden bg-black  bg-opacity-60 px-1 rounded transform -translate-x-1/2 translate-y-2 text-white  text-sm font-title p-1">
              Search
            </div>
          </div>
        </div>
        <ul className="flex items-center space-x-2">
          {" "}
          <li className="!bg-[var(--backgroundColorProfileIcon)] !text-[var(--textProfileIcon)] active:transform active:scale-95 p-1 h-full rounded-full flex items-center  transition-base cursor-pointer select-none mr-3  hover:bg-gray-200">
            <div className="relative flex-shrink-0 ">
              <Image
                className="h-6 w-6 md:h-8 md:w-8 select-none bg-white rounded-full object-cover flex-shrink-0 "
                src="https://q-force-wiki.hotanloc.xyz/assets/b6f23d29-bcba-41eb-8278-70a673d55f20"
                alt="Avatar"
                width={100}
                height={24}
              />
            </div>
            <Link
              href={`/profile/123${localeParam}`}
              className="px-2 font-semibold truncate w-full"
            >
              Thanh Dat
            </Link>
          </li>
          <li className="md:inline hidden">
            <div className="relative">
              <div
                onClick={() => setIsOpenCountry(!isOpenCountry)}
                className={
                  !isOpenCountry
                    ? "!bg-[var(--backgroundColorIconInput)] flex items-center justify-center rounded-full transition-base cursor-pointer active:scale-90 active:transform select-none flex-shrink-0  clickable-secondary bg-gray-100  p-2"
                    : "!bg-[var(--backgroundColorActiveNavBar)]  flex items-center justify-center rounded-full transition-base cursor-pointer active:scale-90 active:transform select-none flex-shrink-0 p-2 "
                }
              >
                <i className="text-center align-middle text-xl w-7 h-7  !text-[var(--textTxt)] text-black bx bx-caret-down"></i>
              </div>
              {isOpenCountry && (
                <div className="!bg-[var(--backgroundSecondary)] animate-fadeIn transition-base absolute top-full transform translate-y-1 right-0 border border-gray-200 bg-white w-60 rounded-lg shadow-lg overflow-hidden p-1  mt-2 select-none z-30">
                  {listLanguages.data.map((item, index) => (
                    // <Link
                    //   key={index}
                    //   // href={`${router.asPath}?locale=${item.code}`}
                    //   href={`${router.asPath}?locale=${item.code}`}
                    //   shallow
                    // >
                    <button
                      onClick={() => handleLinkClick(item)}
                      className="hover:bg-[var(--hoverBackgroundSecondary)] flex items-center space-x-3 w-full pl-2 pr-4 py-2 rounded-md text-left  transition-base transform active:scale-95"
                    >
                      <Image
                        className="h-6 w-6 md:h-8 md:w-8 select-none bg-white rounded-full object-cover flex-shrink-0 "
                        src={`https://q-force-wiki.hotanloc.xyz/assets/${item.cover}`}
                        alt="Avatar"
                        width={40}
                        height={40}
                      />
                      <div>{item.name}</div>{" "}
                      {/* Render each item from listLanguages.data */}
                    </button>
                    // </Link>
                  ))}
                </div>
              )}
            </div>
          </li>
          <li className="md:inline hidden">
            <div className="relative">
              <div
                onClick={() => setIsOpenNavBar(!isOpenNavBar)}
                className={
                  !isOpenNavBar
                    ? "!bg-[var(--backgroundColorIconInput)] flex items-center justify-center rounded-full transition-base cursor-pointer active:scale-90 active:transform select-none flex-shrink-0  clickable-secondary bg-gray-100  p-2"
                    : "!bg-[var(--backgroundColorActiveNavBar)]  flex items-center justify-center rounded-full transition-base cursor-pointer active:scale-90 active:transform select-none flex-shrink-0 p-2 "
                }
              >
                <i className="text-center align-middle text-xl w-7 h-7  !text-[var(--textTxt)] text-black bx bx-caret-down"></i>
              </div>
              {isOpenNavBar && (
                <div className="!bg-[var(--backgroundSecondary)] animate-fadeIn transition-base absolute top-full transform translate-y-1 right-0 border border-gray-200 bg-white w-60 rounded-lg shadow-lg overflow-hidden p-1  mt-2 select-none z-30">
                  <button className="hover:bg-[var(--hoverBackgroundSecondary)] flex items-center space-x-3 w-full pl-2 pr-4 py-2 rounded-md text-left  transition-base transform active:scale-95">
                    <i className="!text-[var(--textTxt)] text-center text-xl align-middle text-black  w-7 h-7 bx  bx-moon"></i>
                    <div>Dark Mode</div>
                  </button>
                  <button className="hover:bg-[var(--hoverBackgroundSecondary)] flex items-center space-x-3 w-full pl-2 pr-4 py-2 rounded-md text-left  transition-base transform active:scale-95">
                    <i className="!text-[var(--textTxt)] bx bx-log-in-circle text-center text-xl align-middle text-black  w-7 h-7"></i>
                    <div>Log Out</div>
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
