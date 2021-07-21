import React, { useState, useEffect } from "react";
import axios from "axios";
import UserInfoCard from "./UserInfoCard";
import Footer from "../Shared/Footer";
import userProfileImage from "../Assest/userProfile.png";

export default function Profile({ user }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    axios
      .get("/favone/user/userProfile", {
        params: { emailAddress: user.sub },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("get user profile");
        console.log(response);

        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log("Error while retriving user profile!!");
        console.log(error);
      });
  }, []);

  return (
    <div className="mainBg bg-cover">
      <div className="container flex  flex-col items-center md:flex-row md:justify-between ">
        <h1 className="text-gray-400 mt-16">Your Profile</h1>

        <img src={userProfileImage} />
        <UserInfoCard userInfo={userInfo} />
      </div>
      <Footer />
    </div>
  );
}
