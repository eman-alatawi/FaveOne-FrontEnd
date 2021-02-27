import React from 'react'
import ReactPlayer from 'react-player'
export default function EpisodeDetails(props) {

    // const movieTitle = props.moviesDramas.filter((movieDrama, index) => {
    //     const getmovieTitle = movieDrama.episodes.findIndex(x => x.id == props.episode.id) !== -1 ? movieDrama.title : ''
    //     return getmovieTitle != -1
    // })
    return (
        <div>
            <div className=" flex flex-row  bg-gray-50  rounded-lg shadow p-10 ">
                
                <div className="h-96 w-80  mr-10 flex flex-col rounded-lg bg-pink-900 text-gray-300">
                    <img className=" h-80 w-80 mr-10 shadow  border-4 border-pink-100 object-cover" src={props.episode.thumbnail} />
                    <div className="w-64  text-center flex flex-col">

                        {props.moviesDramas.map((md, index) =>

                            md.episodes.findIndex(x => x.id == props.episode.id) !== -1 ? <div className="group-hover:text-gray-800">{md.title} </div> : null

                        )}
                        <div className="">Episode # {props.episode.episodNum}</div>
                    </div>

                </div>
                <div className=" w-4/5 flex flex-col pt-2 ">
                    <ReactPlayer url={props.episode.episodeVideoUrl} controls={true} light={props.episode.thumbnail} width="900px" height="375px" />
                </div>
                <div className="h-full w-full  ">
                    <h3 className=" mt-32  text-center text-gray-900 text-3xl opacity-75">Enjoy Watching</h3>
                </div>
                {/* <div className="w-1/12  text-center pt-10 mt-2 mb-4 flex flex-col bg-gray-700 shadow-xl text-gray-300">
                    <h5 className="text-left pl-1">All Episodes: </h5>

                    <ul className="text-left  h-64 overflow-y-scroll">
                        {props.moviesDramas.filter(movieDrama => movieDrama.title == movieTitle).map(filteredDrama => (
                            filteredDrama.episodes.map(episode =>
                                <li>
                                    {episode.episodNum}
                                </li>
                            )

                        ))} */}
                {/* {thisRelatedEpisodes.map((episode, index) =>
                            <li key={index} className="bg-pink-900 my-2 pl-1" >{episode.episodNum} </li>
                        )} */}
                {/* </ul>

                </div> */}

            </div>
            {/* 
            {props.movieDrama.episodes ?
                <div className=" flex flex-col  bg-gray-800  rounded-lg shadow p-10 ">
                    <h4 className="text-gray-300 mb-3 text-xl">Related Movies/Dramas:</h4>
                    <div className="flex flex-row " > {
                        props.actor.movieDramas.map((md, index) =>
                            <div key={index}>
                                <MDRowCard {...md} isAuth={props.actor.isAuth}></MDRowCard>
                            </div>
                        )
                    }
                    </div>
                </div>

                : null} */}





        </div>
    )
}
