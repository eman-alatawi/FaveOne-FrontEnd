import React, { Component } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import swal from 'sweetalert';
import ReactPlayer from 'react-player'

export default class EditEpisode extends Component {
    constructor(props) {
        super(props)

        this.state = {
            episode: props.episode,
            isViewVideo: false
        }
    }

    changeHandler = (event) => {

        const attributeToChange = event.target.name;

        const newValue = event.target.value;

        const updatedEpisode = { ...this.state.episode }
        //for adding the  movie-drama to the episode that it's related to 
        if (attributeToChange === 'movieDrama') {
            if (event.target.checked) {
                // console.log([parseInt(newValue)]);
                updatedEpisode[attributeToChange] = this.props.moviesDramas[parseInt(newValue)]
            }
        }
        else {
            updatedEpisode[attributeToChange] = (newValue);
        }

        // console.log(updatedEpisode);

        this.setState({
            episode: updatedEpisode
        })
    }
    componentDidMount() {
        this.addMDToEpisode()
    }


    addMDToEpisode = () => {

        const thisEpisodeMovieDrama = this.props.moviesDramas.filter((md) => {
            const index = md.episodes.findIndex(x => x.id === this.props.episode.id)
            // console.log(index)
            return index != -1
        })

        const updatedEpisode = this.state.episode
        updatedEpisode['movieDrama'] = thisEpisodeMovieDrama[0]
        this.setState({
            movieDrama: updatedEpisode
        })
    }

    handleSubmit = () => {
        if (this.validate()) {
            this.props.editEpisode(this.state.episode)
        }
    }


    validate = () => {
        var thumbnail = document.getElementById("thumbnail").value;
        var episodeVideoUrl = document.getElementById("episodeVideoUrl").value;
        var episodNum = document.getElementById("episodNum").value;

        var dmTilte = this.state.episode.movieDrama.title
        var mdTotalNumOfEp = this.state.episode.movieDrama.numOfEpisods
        var dmType = this.state.episode.movieDrama.type

        if (episodNum < 1) {
            swal("Wrong!!", "The Episode number should be 1 or more", "error")
            return false;
        }

        if (thumbnail === '' || episodeVideoUrl === '' || episodNum === '') {
            swal("Empty!!", "Some Feilds are empty!", "error")
            return false;

        }else if(episodNum > mdTotalNumOfEp){
            swal("Invalid Episod Number!!", `The ${dmTilte} ${dmType} have ${mdTotalNumOfEp} episodes!`, "error")
            return false;
        }
         else {
            return true;
        }

    }
    onClickHandler = () => {
        this.setState({
            isViewVideo: !this.state.isViewVideo
        })
    }

    render() {

        return (
            <div className="formBG bg-cover pt-4">
                <div class="container-md flex flex-col   w-full justify-center  bg-gray-200  rounded-2xl shadow p-10 mb-12 ">
                    <h2 className="text-center opacity-75 text-3xl mb-5">Edit Episode </h2>
                    {this.state.isViewVideo ?
                        <div className=" flex flex-row w-full justify-center mb-3">
                            <div className="   mr-3 flex-col flex   h-96  ">
                                <ReactPlayer url={this.state.episode.episodeVideoUrl} controls={true} width="800px" height="375px" />
                                <Button onClick={this.onClickHandler} className="btn  h-10 mt-2 mb-4">Hide the video</Button>

                            </div>
                        </div>
                        :
                    <div className=" flex flex-row w-full mb-3">
                        <div className="w-2/4 flex flex-col">

                            <Form.Group  >
                                <Form.Label className="ml-3" > Drama-Movie Thumbnail URL</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="thumbnail" type="text" name="thumbnail" value={this.state.episode.thumbnail} onChange={this.changeHandler} placeholder="https://Drama-Movie-Poster.com/"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label className="ml-3" >Episode Video URL </Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="episodeVideoUrl" type="text" name="episodeVideoUrl" value={this.state.episode.episodeVideoUrl} onChange={this.changeHandler} placeholder="https://Watch-Drama-Movie-Episode.com/"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label className="ml-3" >  Episod Number</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="episodNum" type="number" name="episodNum" value={this.state.episode.episodNum} onChange={this.changeHandler} placeholder="16"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Text muted className="pl-4 w-72 text-justify">
                                * If you can't see the Movie/Drama in the list, you should add them first and then come back here.
                            </Form.Text>
                            <Form.Text muted className="pl-4 ">
                                * All the Feilds are required .
                            </Form.Text>

                            <div className="w-full flex flex-row justify-center">
                                <Button onClick={this.handleSubmit} className="btn w-64 mt-4 mr-3">Edit Episode</Button>
                                <Button onClick={this.onClickHandler} className="btn w-64 mt-4">View the Video</Button>
                            </div>
                        </div>
                        <div className="w-2/4 flex flex-row  ">

                            {/* show thumbnail */}
                            <div className="   mr-3 flex-row flex justify-center w-2/4  h-96  ">
                                <img src={this.state.episode.thumbnail} className="w-full bg-contain shadow-md "></img>
                            </div>

                            <Form.Group className="border-2  border-gray-200 rounded-lg pl-5 w-2/4 h-96 overflow-y-scroll shadow-sm">
                                <Form.Label className="text-lg underline"> Movie - Drama </Form.Label>

                                {this.props.moviesDramas.map((md, index) =>

                                    <div>{md.episodes.findIndex(x => x.id == this.state.episode.id) == -1 ?
                                        <div>
                                            <input className="mr-3" type="radio" name="movieDrama" value={index} onChange={this.changeHandler} />
                                            {md.title}
                                        </div>
                                        :
                                        <div>
                                            <input className="mr-3" type="radio" checked name="movieDrama" value={index} onChange={this.changeHandler} />
                                            {md.title}
                                        </div>}

                                    </div>
                                )}
                            </Form.Group>
                        </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
