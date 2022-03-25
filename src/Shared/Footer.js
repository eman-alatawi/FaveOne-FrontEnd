import React from "react";
import SectionDivider from "./SectionDivider";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import StarIcon from '@material-ui/icons/Star';


export default function Footer() {
  return (
    <div>
      <SectionDivider></SectionDivider>
      <footer className="shadow h-40 md:h-28 flex flex-row justify-center ">
        <div className=" md:flex flex-col  md:flex-row justify-center  pt-5 text-gray-300">
        <div className="text-gray-200 text-center mb-4 md:mr-4  md:text-2xl ">
        <StarIcon fontSize="large" className="bg-pink-800 rounded-full mx-2"  /><span className="hover:text-pink-600">FaveOne</span>
        </div>
          <div className="flex md:flex-row  justify-center  mr-4">
            <div className="mr-4 ">
              <a
                href="https://www.linkedin.com/in/eman-alatawi/"
                target="_blank"
              >
                <span className="text-black  bg-gray-300  rounded-full">
                  <LinkedInIcon className="inline-block align-bottom"/>
                </span>
              </a>
            </div>

            <div>
              <a href="https://github.com/eman-alatawi" target="_blank">
                <span className="text-gray-300 mr-4">
                  <GitHubIcon />
                </span>
              </a>
            </div>
            <p>Ⓒ Copy right for <em>Eman Alatawi</em> 2021</p>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
