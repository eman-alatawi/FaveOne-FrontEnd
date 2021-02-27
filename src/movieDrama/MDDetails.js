import React from 'react'
import MDRowCard from './MDRowCard'
import  { Redirect } from 'react-router-dom'
import EpisodeRowCard from '../episode/EpisodeRowCard';

// const redirectFun =()=>{
//     console.log("inside func")
     
// }
export default function MDDetails(props) {
    const year = new Date(props.movieDrama.releaseYear);
    // console.log(props.history);
    return (
        <div>
            <div className=" flex flex-row  bg-gray-50  rounded-lg shadow p-10 ">
                {/* <button onClick={redirectFun}>Back</button> */}
                <div className="h-96 w-80  mr-10 flex flex-col rounded-lg bg-pink-900 text-gray-300">
                    <img className=" h-80 w-80 mr-10 shadow  border-4 border-pink-100 object-cover" src={props.movieDrama.poster} />
                    <div className="w-64 mt-3  text-center flex flex-col">
                        <h4>{props.movieDrama.type}</h4>
                    </div>
                   
                </div>
                <div className=" w-4/5 flex flex-col pt-2 ">
                    <div className=" flex flex-row justify-start w-full pl-1 mb-4  rounded-l-lg bg-gray-700 shadow-xl text-gray-300">
                        <h4 className="mr-20">{props.movieDrama.title}</h4>
                        <h5 className="mr-20">{year.getFullYear()}</h5>
                        <h5 className="mr-2">Score: </h5><div className="mr-20">{props.movieDrama.score}</div>

                    </div>

                    <p className="text-justify w-full px-5 h-64 overflow-y-scroll">{props.movieDrama.description}</p>


                    <div className=" flex flex-row justify-start w-full pl-1 mb-4  rounded-l-lg bg-gray-700 shadow-xl text-gray-300">
                        <h5 className="mr-2">Duration: </h5><div className="mr-20">{props.movieDrama.duration}</div>
                        <h5 className="mr-2">Content Rating: </h5><div className="mr-20">{props.movieDrama.contentRating}</div>
                        <h5 className="mr-2"># Of Episodes: </h5><div className="mr-20">{props.movieDrama.numOfEpisods}</div>

                    </div>
                </div>
                <div className="w-1/12  text-center pt-10 mt-2 mb-4 flex flex-col bg-gray-700 shadow-xl text-gray-300">
                    <h5 className="text-left pl-1">Genders: </h5>
                        {props.movieDrama.genders ?
                        <ul className="text-left  h-64 overflow-y-scroll">
                        {props.movieDrama.genders.map((gender, index) =>
                            <li key={index} className="bg-pink-900 my-2 pl-1" >{gender.name} </li>
                        )}
                        </ul>
                        : null }
                </div>
            </div>

            {props.movieDrama.episodes ?
                <div className=" flex flex-col  bg-gray-800  rounded-lg shadow p-10   w-full overflow-x-scroll">
                    <h4 className="text-gray-300 mb-3 text-xl">Related Episodes:</h4>
                    <div className="flex flex-row " > {
                        props.movieDrama.episodes.map((episode, index) =>
                            <div key={index}>
                                <EpisodeRowCard {...episode} movieDrama={props.movieDrama}></EpisodeRowCard>
                            </div>
                        )
                    }
                    </div>
                </div>

                : null}





        </div>
    )
}
