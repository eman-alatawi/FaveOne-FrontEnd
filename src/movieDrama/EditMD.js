import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import swal from 'sweetalert';
import Footer from '../Footer';

export default class EditMD extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movieDrama: props.movieDrama

        }
    }

    componentDidMount() {
        this.loadActors();
    }
    loadActors = () => {

        const thisMovieActors = this.props.actors.filter((actor) => {
            const index = actor.movieDramas.findIndex(x => x.id === this.props.movieDrama.id)
            console.log(index)
            return index != -1
        })

        const updatedMovie = this.state.movieDrama
        updatedMovie['actors'] = []
        updatedMovie['actors'] = thisMovieActors
        this.setState({
            movieDrama: updatedMovie
        })
    }
    changeHandler = (event) => {
        const attributeToChange = event.target.name;

        const newValue = event.target.value;

        const updatedMD = { ...this.state.movieDrama }
        //for actors
        if (attributeToChange === 'actors') {
            if (event.target.checked) {
                console.log(newValue);
                console.log(this.props.actors[parseInt(newValue)]);
                updatedMD[attributeToChange].push(this.props.actors[parseInt(newValue)]);
            } else {
                updatedMD[attributeToChange].splice(updatedMD[attributeToChange].findIndex((x) => x.id == this.props.actors[parseInt(newValue)].id), 1);
            }

        } else if (attributeToChange === 'genders') {
            if (event.target.checked) {
                console.log(newValue);
                console.log(this.props.genders[parseInt(newValue)]);
                updatedMD[attributeToChange].push(this.props.genders[parseInt(newValue)]);
            } else {
                updatedMD[attributeToChange].splice(updatedMD[attributeToChange].findIndex((x) => x.id == this.props.genders[parseInt(newValue)].id), 1);
            }

        } else {
            updatedMD[attributeToChange] = (newValue);
        }

        console.log(updatedMD);

        this.setState({
            movieDrama: updatedMD
        })
    }




    handleSubmit = () => {
        if (this.validate()) {
            this.props.editMD(this.state.movieDrama)
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

        if (title === '' || releaseYear === '' || type === '' || description === '' || poster === '' || duration === '' || numOfEpisods === '' || contentRating === '' || score === '') {
            swal("Empty!!", "Some Feilds are empty!", "error")
            return false;
        } else {
            return true;
        }
    }

    componentWillUnmount() {
        this.setState({
            movieDrama: {}
        })
    }
    render() {

        return (
            <div className="formBG bg-cover pt-4">
                <div class="container-md flex flex-col   w-full justify-center  bg-gray-100  rounded-2xl shadow p-10  ">
                    <h2 className="text-center opacity-75 mb-5">Edit Movie - Drama </h2>
                    <div className=" flex flex-row w-full mb-3">
                        <div className="w-2/4 flex flex-col">

                            <Form.Group>
                                <Form.Label className="ml-3">Title</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="title" type="text" name="title" value={this.state.movieDrama.title} onChange={this.changeHandler} placeholder="Voice"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="ml-3">Release Date </Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="releaseYear" type="date" name="releaseYear" value={this.state.movieDrama.releaseYear} onChange={this.changeHandler} placeholder="2017-01-20"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="ml-3">Type</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="type" as="select" name="type" onChange={this.changeHandler}>

                                        <option value="">Select Type</option>
                                        {this.state.movieDrama.type === 'Movie' ? <option selected value="Movie"> Movie</option> : <option value="Movie"> Movie</option>}
                                        {this.state.movieDrama.type === 'Drama' ? <option selected value="Drama"> Drama</option> : <option value="Drama"> Drama</option>}

                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="ml-3">Description</Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="textarea" id="description" required type="text" name="description" value={this.state.movieDrama.description} onChange={this.changeHandler} placeholder="About the crimes ..." className="resize-none"></Form.Control>
                                </Col>

                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="ml-3">Poster URL</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="poster" type="text" name="poster" value={this.state.movieDrama.poster} onChange={this.changeHandler} placeholder="https://Drama-Movie-Poster.com/"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="ml-3"> Duration</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="duration" type="text" name="duration" value={this.state.movieDrama.duration} onChange={this.changeHandler} placeholder="1 hour 30 min"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="ml-3">  # Of Episods</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="numOfEpisods" type="number" name="numOfEpisods" value={this.state.movieDrama.numOfEpisods} onChange={this.changeHandler} placeholder="16"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="ml-3">Content Rating</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="contentRating" as="select" name="contentRating" onChange={this.changeHandler}>
                                        <option value="">Select Content Rate</option>
                                        {this.state.movieDrama.contentRating === '+13' ? <option selected value="+13"> +13</option> : <option value="+13"> +13</option>}
                                        {this.state.movieDrama.contentRating === '+15' ? <option selected value="+15"> +15</option> : <option value="+15"> +15</option>}
                                        {this.state.movieDrama.contentRating === '+17' ? <option selected value="+17"> +17</option> : <option value="+17"> +17</option>}
                                        {this.state.movieDrama.contentRating === 'All Ages' ? <option selected value="All Ages"> All Ages</option> : <option value="All Ages"> All Ages</option>}
                                        {this.state.movieDrama.contentRating === 'Not Yet Rated' ? <option selected value="Not Yet Rated"> Not Yet Rated</option> : <option value="Not Yet Rated"> Not Yet Rated</option>}

                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="ml-3"> Score</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="score" type="text" name="score" value={this.state.movieDrama.score} onChange={this.changeHandler} placeholder="9.0"></Form.Control>
                                </Col>
                            </Form.Group>
                           
                        </div>
                        <div className="w-2/4 flex flex-row  justify-evenly px-2 py-2">

                            <div className="w-2/4 flex flex-col" >
                            <p className="text-center opacity-80">Actors - Cast</p>
                            <Form.Group className="border-2  border-gray-200 rounded-lg pl-5 h-72 overflow-y-scroll shadow-sm">
                                {this.state.movieDrama.actors ?
                                    <div>
                                        {this.props.actors.map((actor, index) =>
                                            <div>{this.state.movieDrama.actors.findIndex(x => x.id == actor.id) == -1 ?
                                                <div>
                                                    <input className="mr-3" type="checkbox" name="actors" value={index} onChange={this.changeHandler} />
                                                    {actor.fullName}</div>
                                                :
                                                <div>
                                                    <input className="mr-3" type="checkbox" checked name="actors" value={index} onChange={this.changeHandler} />
                                                    {actor.fullName}</div>}
                                            </div>
                                        )}
                                    </div>

                                    : null}
                            </Form.Group>

                            <p className="text-center opacity-80">Genders</p>
                            <Form.Group className="border-2  border-gray-200 rounded-lg pl-5 h-72 overflow-y-scroll shadow-sm">
                                {this.props.genders.map((gender, index) =>
                                    <div>{this.state.movieDrama.genders.findIndex(x => x.id == gender.id) == -1 ?
                                        <div>
                                            <input className="mr-3" type="checkbox" name="genders" value={index} onChange={this.changeHandler} />
                                            {gender.name}</div>
                                        :
                                        <div>
                                            <input className="mr-3" type="checkbox" checked name="genders" value={index} onChange={this.changeHandler} />
                                            {gender.name}</div>}
                                    </div>
                                )}
                            </Form.Group>
                            </div>
                            <div className="w-2/4 mr-2 flex  flex-col" >
                                <p className="text-center opacity-40">Poster preview</p>

                                {/* show poster */}
                                <div className="   ml-3 flex-row flex justify-center   h-72  ">
                                    <img src={this.state.movieDrama.poster} className=" bg-contain shadow-md rounded"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center">
                                <Button onClick={this.handleSubmit} className="btn w-64">Edit Movie - Drama</Button>
                            </div>
                </div>
            </div>
        )
    }
}
