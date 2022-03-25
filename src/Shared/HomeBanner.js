import React from "react";
import SectionDivider from "./SectionDivider";

export default function HomeBanner() {
  return (
    <div className="relative shadow   blackBg">
      <div className="bannerEffect  bannerHight"></div>
      {/* <img
        className="h-full w-full object-cover bannerEffect"
        src="https://coverfiles.alphacoders.com/161/thumb-1920-161470.jpg"
      ></img> */}
      <h1 className="text-center absolute top-1/2 left-5 right-5 md:left-28 md:right-28 text-gray-200 sm:text-4xl text-lg textShadow ">
        {" "}
        Welcome :) This is your place, share your favorite movies, dramas,
        actors with the world
      </h1>
      <SectionDivider></SectionDivider>
    </div>
  );
}
