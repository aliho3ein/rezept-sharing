import { FC } from "react";
import ProfileHeader from "../components/userProfile/ProfileHeader";
import ProfileMainSection from "../components/userProfile/ProfileMainSection";

const UserProfile: FC = () => {
  return (
    <>
      <ProfileHeader />
      <ProfileMainSection />
    </>
  );
};

export default UserProfile;
