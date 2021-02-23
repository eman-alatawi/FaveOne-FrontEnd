import React from 'react'
import MDRowCard from '../movieDrama/MDRowCard'
export default function ActorDetails(props) {
    console.log(props.actor.fullName)
    return (
        <div>
            <div className=" flex flex-row  bg-gray-50  rounded-lg shadow p-10 mb-12">
                <div className="h-96 w-72  mr-10 flex flex-col bg-blue-400 shadow text-white">
                    <img className=" h-72 w-72 mr-10 shadow  border-4 border-pink-100 object-cover" src={props.actor.picture} />
                    <div className="w-64 mt-3  text-center flex flex-col">
                        <h4>Social Account:</h4>
                        {props.actor.socialAccount}
                    </div>
                </div>
                <div className=" w-full flex flex-col">
                    <div className=" flex flex-row justify-start w-full mb-4">
                        <h4 className="mr-20">{props.actor.fullName}</h4>
                        <h4 className="mr-20">{props.actor.dateOfBirth}</h4>
                        <h4>{props.actor.gender}</h4>
                    </div>

                    <h4>Biography:</h4>
                    <p className="text-justify w-5/5 pr-5 h-72 overflow-y-scroll">{props.actor.biography}</p>
                </div>
            </div>
            <div className=" flex flex-row  bg-gray-50  rounded-lg shadow p-10 mb-12">
                
                {props.actor.movieDramas.map((md, index) =>
                 <div key={index}>
                <MDRowCard {...md} isAuth={props.actor.isAuth}></MDRowCard>
                </div>
                )}

            </div>

        </div>
    )
}
