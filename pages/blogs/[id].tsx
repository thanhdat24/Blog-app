import dynamic from "next/dynamic";

const blogDetail = dynamic(() => import("shop/blogDetail"), {
  ssr: false,
});

export default blogDetail;
