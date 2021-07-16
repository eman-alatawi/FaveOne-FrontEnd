import React from "react";
import SectionDivider from "./SectionDivider";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import StarIcon from '@material-ui/icons/Star';


export default function Footer() {
  return (
    <div>
      <SectionDivider></SectionDivider>
      <footer className="bg-gray-800 shadow h-24 flex flex-row justify-center ">
        <div className=" h-24 w-6/12 flex flex-row justify-center  pt-5 text-gray-300">
        <div className="text-gray-200 ml-5 mr-11 text-2xl hover:text-pink-600">
        <StarIcon fontSize="large" />FaveOne
        </div>
          <div className="flex flex-row justify-center w-20 mr-4">
            <div className="mr-4">
              <a
                href="https://www.linkedin.com/in/eman-alatawi/"
                target="_blank"
              >
                <span className="text-gray-300">
                  <LinkedInIcon />
                </span>
              </a>
            </div>

            <div>
              <a href="https://github.com/eman-alatawi" target="_blank">
                <span className="text-gray-300">
                  <GitHubIcon />
                </span>
              </a>
            </div>
          </div>
          <p>Ⓒ Copy right for Cloud 2021</p>
        </div>
      </footer>
    </div>
  );
}
