import React, { Component } from 'react'
import swal from 'sweetalert';
import Footer from '../Shared/Footer';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import { Animated } from "react-animated-css";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';


class NewMD extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            movieDrama: {
                actors: [],
                genders: [],
                user: null
            },
            open: false
        }
    }
    componentDidMount() {
        this.loadUser(this.props.user.sub);
    }
    changeHandler = (event) => {

        const attributeToChange = event.target.name;

        const newValue = event.target.value;

        const updatedMD = { ...this.state.movieDrama }
        //for actors
        if (attributeToChange === 'actors') {
            if (event.target.checked) {
                // console.log(newValue);
                // console.log(this.props.actors[parseInt(newValue)]);
                updatedMD[attributeToChange].push(this.props.actors[parseInt(newValue)]);
            } else {
                updatedMD[attributeToChange].splice(updatedMD[attributeToChange].findIndex((x) => x.id == this.props.actors[parseInt(newValue)].id), 1);
            }

        } else if (attributeToChange === 'genders') {
            if (event.target.checked) {
                // console.log(newValue);
                // console.log(this.props.genders[parseInt(newValue)]);
                updatedMD[attributeToChange].push(this.props.genders[parseInt(newValue)]);
            } else {
                updatedMD[attributeToChange].splice(updatedMD[attributeToChange].findIndex((x) => x.id == this.props.genders[parseInt(newValue)].id), 1);
            }
        }
        else {
            updatedMD[attributeToChange] = (newValue);
        }

        // console.log(updatedMD);

        this.setState({
            movieDrama: updatedMD
        })
    }

    loadUser = (emailAddress) => {
        // axios.get(`${process.env.REACT_APP_BACK_END_URL}user/userProfile`,
        axios.get("/favone/user/userProfile",
            {
                params: { emailAddress: emailAddress },
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("get user profile");
                console.log(response);

                this.setState({
                    user: response.data
                })
                this.addUserToMD();
            })
            .catch(error => {
                console.log("Error while retriving user profile!!");
                console.log(error);
            })
    }


    addUserToMD = () => {
        const updatedMD = this.state.movieDrama
        updatedMD['user'] = this.state.user
        this.setState({
            movieDrama: updatedMD
        })
    }

    handleSubmit = () => {
        if (this.validate()) {
            this.props.addMD(this.state.movieDrama)
            this.props.history.push('/movieDramaIndex');
        }
    }



    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };
    handleClose = () => {
        this.setState({
            open: false
        })
    };

    validate = () => {
        var title = document.getElementById("title").value;
        var releaseYear = document.getElementById("releaseYear").value;
        var type = document.getElementById("type").value;
        var description = document.getElementById("description").value;
        var poster = document.getElementById("poster").value;
        var duration = document.getElementById("duration").value;
        var numOfEpisods = document.getElementById("numOfEpisods").value;
        var contentRating = document.getElementById("contentRating").value;
        var score = document.getElementById("score").value;

        if (numOfEpisods < 1) {
            swal("Wrong!!", "Number of Episodes should be 1 or more", "error")
            return false;
        }

        if (score < 0 || score > 10) {
            swal("Wrong!!", "The score should be from 0 to 10", "error")
            return false;
        }

        if (title === '' || releaseYear === '' || type === '' || description === '' || poster === '' || duration === '' || numOfEpisods === '' || contentRating === '' || score === '') {
            swal("Empty!!", "Some Feilds are empty!", "error")
            return false;

        }
        else {
            return true;
        }
    }

    render() {

        return (
            <div className="formBG bg-cover pt-4">


                <div className="w-full mb-5">
                    <h2 className="text-left ml-28 opacity-75 text-2xl mb-4">Add New Movie - Drama </h2>

                    <div className="flex flex-row  justify-between w-3/4 px-16">
                        <div className="flex flex-col w-2/4 items-center">

                            <TextField id="title" label="Title" type="text" name="title" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />


                            <Tooltip title="Release Date">
                                <TextField id="releaseYear" type="date" name="releaseYear" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />
                            </Tooltip>


                            <FormControl className="w-96 mb-3">
                                <InputLabel id="label-of-type">Type</InputLabel>
                                <Select
                                    labelId="label-of-type"
                                    name="type"
                                    id="type"
                                    onChange={this.changeHandler}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="Movie">Movie</MenuItem>
                                    <MenuItem value="Drama">Drama</MenuItem>
                                </Select>
                            </FormControl>


                            <Tooltip title="Maximum 5000 charactor">
                                <TextField
                                    className="w-96 mb-4"
                                    id="description"
                                    label="Description - about the movie or drama"
                                    rowsMax={4}
                                    multiline
                                    name="description"
                                    onChange={this.changeHandler}
                                />
                            </Tooltip>


                            <TextField id="poster" label="Poster URL" type="text" name="poster" onChange={this.changeHandler} className="w-96 mb-3" color="primary"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Tooltip title="Click this icon to view the poster">
                                                <Animated animationIn="tada" animationInDuration={8000} isVisible={true}>
                                                    <div className=" cursor-pointer transform hover:scale-110 motion-reduce:transform-none">
                                                        <ImageOutlinedIcon onClick={this.handleClickOpen} />
                                                    </div>
                                                </Animated>
                                            </Tooltip>
                                        </InputAdornment>
                                    ),
                                }} />

                            {/* if click on the picture icon show a dialog of the actor picture  */}
                            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                                <div id="customized-dialog-title" onClose={this.handleClose} className="flex flex-row w-full justify-between">
                                    <span className="text-xl self-center pl-2">Movie or Drama Poster</span>
                                    {this.state.open ? (
                                        <IconButton aria-label="close" onClick={this.handleClose}>
                                            <CloseIcon />
                                        </IconButton>
                                    ) : null}
                                </div>
                                {this.state.movieDrama.poster ?
                                    <img src={this.state.movieDrama.poster} />
                                    :
                                    <div className="flex flex-col items-center ">
                                        <InfoOutlinedIcon color="primary" /> <p className="m-4 text-blue-400">Add the URL of the drama or the movie poster first</p></div>
                                }
                            </Dialog>


                            <Tooltip title="ex: 1 hour 30 min">
                                <TextField id="duration" label="Duration" type="text" name="duration" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />
                            </Tooltip>


                            <TextField id="numOfEpisods" label="Total number of Episods" type="number" name="numOfEpisods" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />


                            <FormControl className="w-96 mb-3">
                                <InputLabel id="label-of-rate">Content Rating</InputLabel>
                                <Select
                                    labelId="label-of-rate"
                                    name="contentRating"
                                    id="contentRating"
                                    onChange={this.changeHandler}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="+13">+13</MenuItem>
                                    <MenuItem value="+15">+15</MenuItem>
                                    <MenuItem value="+17">+17</MenuItem>
                                    <MenuItem value="All Ages">All Ages</MenuItem>
                                    <MenuItem value="Not Yet Rated">Not Yet Rated</MenuItem>
                                </Select>
                            </FormControl>


                            <Tooltip title="ex: 9.6">
                                <TextField id="score" label="Score" type="text" name="score" onChange={this.changeHandler} className="w-96 mb-5" color="primary" />
                            </Tooltip>

                            <Button onClick={this.handleSubmit} className=" w-64">Add Movie - Drama</Button>

                        </div>


                        <div className="flex flex-col w-2/4 bg-white rounded-r-lg px-6 pt-4">

                            <FormControl component="fieldset"  >
                                <Tooltip title="Scroll horizontally for more">
                                    <FormLabel component="legend">Actors - Cast</FormLabel>
                                </Tooltip>
                                <FormGroup className="grid  gap-x-5  gap-y-2 h-64 overflow-y-scroll ">
                                    {this.props.actors.map((actor, index) =>
                                        <div className="mr-4 mb-3">
                                            <input className="mr-2" type="checkbox" name="actors" value={index} onChange={this.changeHandler} />
                                            {actor.fullName}
                                        </div>
                                    )}
                                </FormGroup>
                            </FormControl>

                            <FormControl component="fieldset"  >
                                <Tooltip title="Scroll horizontally for more">
                                    <FormLabel component="legend">Genders - Catagory</FormLabel>
                                </Tooltip>
                                <FormGroup className="grid  gap-x-5  gap-y-2 h-64 overflow-y-scroll ">
                                    {this.props.genders.map((gender, index) =>
                                        <div className="mr-3 mb-3">
                                            <input className="mr-2" type="checkbox" name="genders" value={index} onChange={this.changeHandler} />
                                            {gender.name}
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
export default withRouter(NewMD);
