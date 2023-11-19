import dynamic from "next/dynamic";

const Profile = dynamic(() => import("shop/profile"), {
  ssr: false,
});

export default Profile;
