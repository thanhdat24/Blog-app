import dynamic from "next/dynamic";

const Friends = dynamic(() => import("shop/friends"), {
  ssr: false,
});

export default Friends;
