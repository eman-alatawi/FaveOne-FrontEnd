import React from 'react'

export default function ActorDetails(props) {
    console.log(props.actor.fullName)
    return (
        <div>
            <div className=" flex flex-row ">
                <img className=" h-72 w-72 mr-10 shadow border-double border-4 border-pink-100 object-cover" src={props.actor.picture} />
                <div className=" w-full flex flex-col">
                    <div className=" flex flex-row justify-start w-full mb-4">
                        <h4 className="mr-20">{props.actor.fullName}</h4>
                        <h4 className="mr-20">{props.actor.dateOfBirth}</h4>
                        <h4>{props.actor.gender}</h4>
                    </div>

                    <h4>Biography:</h4>
                    <p className="text-justify w-5/5 pr-5">{props.actor.biography}</p>
                </div>
            </div>
            <div className="w-64 mt-3  text-center flex flex-col">
            <h4>Social Account:</h4>
                {props.actor.socialAccount}
            </div>
        </div>
    )
}
