import React, { Component } from 'react'
import {Form, Button, Col } from 'react-bootstrap'
import swal from 'sweetalert';
import Footer from '../Shared/Footer';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

 class NewMD extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            movieDrama: {
                actors: [],
                genders: [],
                user: null
            }
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
        axios.get(`${process.env.REACT_APP_BACK_END_URL}user/userProfile`,
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

        if(score <0 ||  score >10){
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
                <div class="container-md flex flex-col   w-full justify-center  bg-gray-200  rounded-2xl shadow p-10 mb-12 ">
                    <h2 className="text-center opacity-75 text-3xl mb-5">Add New Movie - Drama </h2>
                    <div className=" flex flex-row w-full mb-3">
                        <div className="w-2/4 flex flex-col">
                            <Form.Group >
                                <Form.Label className="ml-3">Title</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="title" type="text" name="title" onChange={this.changeHandler} placeholder="Voice"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="ml-3">Release Date </Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="releaseYear" type="date" name="releaseYear" onChange={this.changeHandler} placeholder="2017-01-20"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="ml-3">Type</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="type" as="select" name="type" onChange={this.changeHandler}>
                                        <option value="">Select Type</option>
                                        <option value="Movie"> Movie</option>
                                        <option value="Drama"> Drama</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="ml-3">Description</Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="textarea" id="description" required type="text" name="description" onChange={this.changeHandler} placeholder="About the crimes ..." className="resize-none"></Form.Control>
                                </Col>

                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="ml-3">Poster URL</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="poster" type="text" name="poster" onChange={this.changeHandler} placeholder="https://Drama-Movie-Poster.com/"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="ml-3"> Duration</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="duration" type="text" name="duration" onChange={this.changeHandler} placeholder="1 hour 30 min"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="ml-3">  # Of Episods</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="numOfEpisods" type="number" name="numOfEpisods" onChange={this.changeHandler} placeholder="16"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="ml-3">Content Rating</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="contentRating" as="select" name="contentRating" onChange={this.changeHandler}>
                                        <option value="">Select Content Rate</option>
                                        <option value="+13"> +13</option>
                                        <option value="+15"> +15</option>
                                        <option value="+17"> +17</option>
                                        <option value="All Ages"> All Ages</option>
                                        <option value="Not Yet Rated"> Not Yet Rated</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="ml-3"> Score</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="score" type="text" name="score" onChange={this.changeHandler} placeholder="9.0"></Form.Control>
                                </Col>
                            </Form.Group>

                        </div>
                        <div className="w-2/4 flex flex-row  justify-evenly px-2 py-2">

                            <div className="w-2/4  flex flex-col" >
                                <p className="text-center opacity-80">Actors - Cast</p>
                                <Form.Group className="border-2  border-gray-300 rounded-lg pl-5 h-72 overflow-y-scroll shadow-sm">
                                    {this.props.actors.map((actor, index) =>
                                        <div>
                                            <input className="mr-3" type="checkbox" name="actors" value={index} onChange={this.changeHandler} />
                                            {actor.fullName}
                                        </div>
                                    )}
                                </Form.Group>

                                <p className="text-center opacity-80">Genders</p>
                                <Form.Group className="border-2  border-gray-300 rounded-lg pl-5 h-72 overflow-y-scroll shadow-sm">
                                    {this.props.genders.map((gender, index) =>
                                        <div>
                                            <input className="mr-3" type="checkbox" name="genders" value={index} onChange={this.changeHandler} />
                                            {gender.name}
                                        </div>
                                    )}
                                </Form.Group>
                            </div>
                            <div className="w-2/4 mr-2 flex flex-col" >
                                <p className="text-center opacity-40">Poster preview</p>

                                {/* show poster */}
                                <div className="   ml-3 flex-row flex justify-center   h-72  ">
                                    <img src={this.state.movieDrama.poster} className=" bg-contain w-full shadow-md rounded"></img>
                                </div>

                                <Form.Text muted className="text-xs  px-10 mt-3 text-justify">
                                * If you can't see the Actors/Genders in the list, you should add them first and then come back here.
                            </Form.Text>
                            <Form.Text muted className="text-xs   px-10 mt-3 text-justify">
                                * All the Feilds are required .
                            </Form.Text>
                            </div>
                        </div>

                    </div>
                    <div className="w-full flex flex-row mt-2 justify-center">
                        <Button onClick={this.handleSubmit} className="btn w-64">Add Movie - Drama</Button>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
export default withRouter(NewMD); 
