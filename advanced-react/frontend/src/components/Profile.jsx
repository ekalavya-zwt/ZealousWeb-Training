import React from "react";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const { user } = useOutletContext();

  return <p>Hi {user.name}!</p>;
};

export default Profile;
