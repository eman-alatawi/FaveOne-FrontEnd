import React from 'react'
import SectionDivider from './SectionDivider'

export default function HomeBanner() {
    return (
        <div className="relative shadow ">
          <img className="h-72 w-full object-cover" src="https://coverfiles.alphacoders.com/161/thumb-1920-161470.jpg"></img>
          <h1 className="text-center absolute top-20 left-28 right-28 text-gray-200 text-4xl textShadow "> Welcome :) This is your place, share your favorite movies, dramas, actors with the world</h1>
          <SectionDivider></SectionDivider>
        </div>
    )
}
