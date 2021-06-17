import React, { Component } from 'react'
import swal from 'sweetalert';
import Footer from '../Shared/Footer';
import ReactPlayer from 'react-player'
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import MovieIcon from '@material-ui/icons/Movie';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import { Animated } from "react-animated-css";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

class NewEpisode extends Component {
    constructor(props) {
        super(props)

        this.state = {
            episode: {
                movieDrama: {}
            },
            openPoster: false,
            openVideo: false
        }
    }

    changeHandler = (event) => {

        const attributeToChange = event.target.name;

        const newValue = event.target.value;

        const updatedEpisode = { ...this.state.episode }
        //for adding the  movie-drama to the episode that it's related to 
        if (attributeToChange === 'movieDrama') {
            if (event.target.checked) {
                console.log([parseInt(newValue)]);
                updatedEpisode[attributeToChange] = this.props.moviesDramas[parseInt(newValue)]

            }

        }
        else {
            updatedEpisode[attributeToChange] = (newValue);
        }

        console.log(updatedEpisode);

        this.setState({
            episode: updatedEpisode
        })
    }


    handleSubmit = () => {
        if (this.validate()) {
            this.props.addEpisode(this.state.episode)
            this.props.history.push('/episodeIndex');

        }
    }


    validate = () => {
        var thumbnail = document.getElementById("thumbnail").value;
        var episodeVideoUrl = document.getElementById("episodeVideoUrl").value;
        var episodNum = document.getElementById("episodNum").value;
        // var movieDrama = document.getElementById("movieDrama").value;
        // console.log(movieDrama)

        var dmTilte = this.state.episode.movieDrama.title
        var mdTotalNumOfEp = this.state.episode.movieDrama.numOfEpisods
        var dmType = this.state.episode.movieDrama.type

        console.log("mdTotalNumOfEp" + mdTotalNumOfEp)

        if (episodNum < 1) {
            swal("Wrong!!", "The Episode number should be 1 or more", "error")
            return false;
        }

        if (thumbnail === '' || episodeVideoUrl === '' || episodNum === '') {
            swal("Empty!!", "Some Feilds are empty!", "error")
            return false;

        } else if (episodNum > mdTotalNumOfEp) {
            swal("Invalid Episod Number!!", `The ${dmTilte} ${dmType} have ${mdTotalNumOfEp} episodes!`, "error")
            return false;
        } else if (JSON.stringify(this.state.episode.movieDrama) === '{}') {
            swal("Empty!!", "You should select the drama or movie title", "error")
            return false;
        }
        else {
            return true;
        }
    }

    handleClickOpenPoster = () => {
        this.setState({
            openPoster: true
        })
    };
    handleClosePoster = () => {
        this.setState({
            openPoster: false
        })
    };

    handleClickOpenVideo = () => {
        this.setState({
            openVideo: true
        })
    };
    handleCloseVideo = () => {
        this.setState({
            openVideo: false
        })
    };

    handleClickCancel = () =>{
        this.props.history.push('/');

    }

    render() {

        return (
            <div className="formBG bg-cover pt-4">
                <div class="w-full mb-5 ">
                    <h2 className="text-left ml-28 opacity-75 text-2xl mb-5">Add New Episode </h2>

                    <div className="flex flex-row  justify-between w-3/4 px-16">
                        <div className="flex flex-col w-2/4 items-center">

                            <Tooltip title="Click this icon to view the poster">
                                <TextField id="thumbnail" label="Drama or Movie Thumbnail URL" type="text" name="thumbnail" onChange={this.changeHandler} className="w-96 mb-3" color="primary"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Animated animationIn="tada" animationInDuration={8000} isVisible={true}>
                                                    <div className=" cursor-pointer transform hover:scale-110 motion-reduce:transform-none">
                                                        <ImageOutlinedIcon onClick={this.handleClickOpenPoster} />
                                                    </div>
                                                </Animated>
                                            </InputAdornment>
                                        ),
                                    }} />
                            </Tooltip>

                            {/* if click on the picture icon show a dialog of the Drama or Movie Thumbnail  */}
                            <Dialog onClose={this.handleClosePoster} aria-labelledby="customized-dialog-title" open={this.state.openPoster}>
                                <div id="customized-dialog-title" onClose={this.handleClosePoster} className="flex flex-row w-full justify-between">
                                    <span className="text-xl self-center pl-2"> Drama or Movie poster thumbnail </span>
                                    {this.state.openPoster ? (
                                        <IconButton aria-label="close" onClick={this.handleClosePoster}>
                                            <CloseIcon />
                                        </IconButton>
                                    ) : null}
                                </div>
                                {this.state.episode.thumbnail ?
                                    <img src={this.state.episode.thumbnail} />
                                    :
                                    <div className="flex flex-col items-center ">
                                        <InfoOutlinedIcon color="primary" /> <p className="m-4 text-blue-400">Add the URL of the drama or the movie poster first</p></div>
                                }
                            </Dialog>

                            <Tooltip title="Click this icon to view the video of the episode">
                                <TextField id="episodeVideoUrl" label="Episode Video URL" type="text" name="episodeVideoUrl" onChange={this.changeHandler} className="w-96 mb-3" color="primary"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Animated animationIn="tada" animationInDuration={8000} isVisible={true}>
                                                    <div className=" cursor-pointer transform hover:scale-110 motion-reduce:transform-none">
                                                        <MovieIcon onClick={this.handleClickOpenVideo} />
                                                    </div>
                                                </Animated>
                                            </InputAdornment>
                                        ),
                                    }} />
                            </Tooltip>

                            {/* if click on the picture icon show a dialog of the Drama or Movie  episode video  */}
                            <Dialog onClose={this.handleCloseVideo} aria-labelledby="customized-dialog-title" open={this.state.openVideo}>
                                <div id="customized-dialog-title" onClose={this.handleCloseVideo} className="flex flex-row w-full justify-between">
                                    <span className="text-xl self-center pl-2"> Episode Video </span>
                                    {this.state.openVideo ? (
                                        <IconButton aria-label="close" onClick={this.handleCloseVideo}>
                                            <CloseIcon />
                                        </IconButton>
                                    ) : null}
                                </div>
                                {this.state.openVideo && this.state.episode.episodeVideoUrl ?
                                    <ReactPlayer url={this.state.episode.episodeVideoUrl} controls={true} width="500px" height="375px" />
                                    :
                                    <Tooltip title="You can Include the URL of any video in these platforms: YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion.">
                                        <div className="flex flex-col items-center ">
                                            <InfoOutlinedIcon color="primary" /> <p className="m-4 text-blue-400">Add the URL of the episode video first</p>
                                        </div>
                                    </Tooltip>
                                }
                            </Dialog>

                            <TextField id="episodNum" label="Episod Number" type="number" name="episodNum" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />

                            <Button onClick={this.handleSubmit} className=" w-64 mt-4 mr-3">Add Episode</Button>
                            <Button className="w-64" onClick={this.handleClickCancel}>Cancel</Button>



                        </div>
                        <div className="flex flex-col w-2/4 bg-white rounded-r-lg px-6 pt-4">

                            <FormControl component="fieldset"  >
                                <Tooltip title="Scroll horizontally for more">
                                    <FormLabel component="legend">Movie or Drama Title</FormLabel>
                                </Tooltip>
                                <FormGroup className="grid  gap-x-5  gap-y-2 h-48 overflow-y-scroll ">
                                    {this.props.moviesDramas.map((md, index) =>
                                        <div>
                                            <input id="movieDrama" className="mr-3" type="radio" name="movieDrama" value={index} onChange={this.changeHandler} />
                                            {md.title}
                                        </div>
                                    )}
                                </FormGroup>
                            </FormControl>

                        </div>
                    </div>


                </div>
                <Footer></Footer>
            </div>
        )
    }
}
export default withRouter(NewEpisode);
