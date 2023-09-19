import { FC } from "react";
import ProfileHeader from "../components/userProfile/ProfileHeader";
import ProfileMainSection from "../components/userProfile/ProfileMainSection";

const UserProfile: FC = () => {
  return (
    <div>
      <ProfileHeader />
      <ProfileMainSection />
    </div>
  );
};

export default UserProfile;
