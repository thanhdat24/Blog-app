import React from "react";
import "../styles/globals.css";
import "boxicons/css/boxicons.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const CountrySwitcher = dynamic(() => import("shop/countrySwitcher"));

function MyApp({ Component, pageProps }) {
  // const router = useRouter();
  // React.useEffect(() => {
  //   // Kiểm tra xem đường dẫn có tham số locale không
  //   if (!router.asPath.includes("locale")) {
  //     // Nếu không có, chuyển hướng sang đường dẫn mới với tham số locale
  //     router.replace(`${router.asPath}?locale=en-US`, undefined, {
  //       shallow: true,
  //     });
  //   }
  // }, [router]);
  return (
    <>
      <Component {...pageProps} />
      <CountrySwitcher />
    </>
  );
}

export default MyApp;
