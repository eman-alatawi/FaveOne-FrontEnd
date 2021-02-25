import React from 'react'

export default function EpisodeDetails(props) {

    // const movieTitle = props.moviesDramas.filter((movieDrama, index) => {
    //     const getmovieTitle = movieDrama.episodes.findIndex(x => x.id == props.episode.id) !== -1 ? movieDrama.title : ''
    //     return getmovieTitle != -1
    // })
    return (
        <div>
            <div className=" flex flex-row  bg-gray-50  rounded-lg shadow p-10 ">
                {/* <button onClick={redirectFun}>Back</button> */}
                <div className="h-96 w-80  mr-10 flex flex-col rounded-lg bg-pink-900 text-gray-300">
                    <img className=" h-80 w-80 mr-10 shadow  border-4 border-pink-100 object-cover" src={props.episode.thumbnail} />
                    <div className="w-64 mt-3  text-center flex flex-col">
                        Episode # {props.episode.episodNum}
                        {props.moviesDramas.map((md, index) =>

                            md.episodes.findIndex(x => x.id == props.episode.id) !== -1 ? <div className="group-hover:text-gray-800">{md.title} </div> : null

                        )}
                    </div>

                </div>
                <div className=" w-4/5 flex flex-col pt-2 ">
                    {/* <div className=" flex flex-row justify-start w-full pl-1 mb-4  rounded-l-lg bg-gray-700 shadow-xl text-gray-300">
                        {/* <h4 className="mr-20">{props.movieDrama.title}</h4> */}
                    {/* <h5 className="mr-20"></h5>

                    </div> */}

                    <div className="text-justify w-full px-5 h-full overflow-y-scroll">
                        <video
                            controls
                            autoPlay
                            src={props.episode.episodeVideoUrl} />
                    </div>
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
