import React from 'react'
import ReactPlayer from 'react-player'
export default function EpisodeDetails(props) {

    const getMovieDramaByTitle = props.moviesDramas.filter((movieDrama, index) => {
        const movieTitle = movieDrama.episodes.findIndex(x => x.id == props.episode.id) !== -1 ? movieDrama.title : ''; 
        console.log(movieTitle)
        return movieTitle;
    })
    console.log(getMovieDramaByTitle)

    const relatedEpisodes =  (
    getMovieDramaByTitle != '' ?
    getMovieDramaByTitle[0].episodes.map((episode, index) =>
        <li key={index} className="bg-pink-900 hover:bg-white my-2 pl-1 text-center" > <span onClick={() => props.detailView(episode.id)} className=" cursor-pointer  hover:text-gray-800 " >Episode  {episode.episodNum} </span></li>
    ) : null)

    return (
        <div className=" bg-gray-50 rounded-lg shadow">
             <div className="h-full w-full  ">
                    <h3 className="  mt-3 text-center text-gray-900 text-3xl opacity-75">Enjoy Watching</h3>
                </div>
            <div className=" flex flex-row p-10 ">

                <div className="h-96 w-80  mr-10 flex flex-col rounded-lg bg-pink-900 text-gray-300">
                    <img className=" h-80 w-80 mr-10 shadow  object-cover" src={props.episode.thumbnail} />
                    <div className="w-64  text-center flex flex-col">

                        {props.moviesDramas.map((md, index) =>

                            md.episodes.findIndex(x => x.id == props.episode.id) !== -1 ? <div className="group-hover:text-gray-800">{md.title} </div> : null

                        )}
                        <div className="">Episode  {props.episode.episodNum}</div>
                    </div>

                </div>
                <div className=" w-4/5 flex flex-col pt-2 "> 
                {/* light={props.episode.thumbnail} */}
                    <ReactPlayer url={props.episode.episodeVideoUrl} controls={true}  width="800px" height="375px" />
                </div>
               
                <div className="w-2/12  text-center pt-10 mt-2 mb-4 flex flex-col bg-gray-700 shadow-xl text-gray-300">
                    <h5 className="text-center">All Episodes: </h5>

                    <ul className="text-left  h-72 overflow-y-scroll">
                       {relatedEpisodes}
                    </ul>

                </div>

            </div>
        </div>
    )
}
