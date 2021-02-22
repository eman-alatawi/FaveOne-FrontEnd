import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import swal from 'sweetalert';

export default class EditMD extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movieDrama: props.movieDrama,
            movieDrama: {
                actors: []
            }
        }
    }
    changeHandler = (event) => {
        const attributeToChange = event.target.name;

        const newValue = event.target.value;

        const updatedMD = { ...this.state.movieDrama }
        if (attributeToChange === 'actors') {
            if(event.target.checked){
                console.log(newValue);
                console.log(this.props.actors[parseInt(newValue)]);
                updatedMD[attributeToChange].push(this.props.actors[parseInt(newValue)]);
            }else{
                updatedMD[attributeToChange].splice(updatedMD[attributeToChange].findIndex((x) => x.id == this.props.actors[parseInt(newValue)].id),1);
            }
          
        }else{
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

        if (title === '' || releaseYear === '' || type === '' || description === '' || poster === '' || duration === '' || numOfEpisods === '' || contentRating === '' || score === '' ) {
            swal("Empty!!", "Some Feilds are empty!", "error")
            return false;
        } else {
            return true;
        }
    }

    render() {

        return (
            <div>
                <div class="container-sm flex flex-row  w-full justify-center my-5 bg-gray-100  rounded-2xl shadow p-10 mb-12 ">
                    <Container>
                        <h2 className="text-center opacity-75 mb-5">Edit Movie - Drama </h2>
                        <div className="w-2/4 flex flex-col bg-black">

                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>Title</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="title" type="text" name="title" value={this.state.movieDrama.title} onChange={this.changeHandler} placeholder="Voice"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Release Date </Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="releaseYear" type="date" name="releaseYear" value={this.state.movieDrama.releaseYear} onChange={this.changeHandler} placeholder="2017-01-20"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Type</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="type" as="select" name="type" onChange={this.changeHandler}>
                                        <option value="">Select Type</option>
                                        <option value="Movie"> Movie</option>
                                        <option value="Drama"> Drama</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Description</Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="textarea" id="description" required type="text" name="description" value={this.state.movieDrama.description} onChange={this.changeHandler} placeholder="About the crimes ..."></Form.Control>
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Poster URL</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="poster" type="text" name="poster" value={this.state.movieDrama.poster} onChange={this.changeHandler} placeholder="https://Drama-Movie-Poster.com/"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}> Duration</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="duration" type="text" name="duration" value={this.state.movieDrama.duration} onChange={this.changeHandler} placeholder="1 hour 30 min"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}> Num Of Episods</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="numOfEpisods" type="number" name="numOfEpisods" value={this.state.movieDrama.numOfEpisods} onChange={this.changeHandler} placeholder="1 hour 30 min"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Content Rating</Form.Label>
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
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}> Score</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="score" type="text" name="score" value={this.state.movieDrama.score} onChange={this.changeHandler} placeholder="9.0"></Form.Control>
                                </Col>
                            </Form.Group>



                        </div>
                        <div className="w-2/4 flex flex-col bg-blue-300">
                            <Form.Group>
                                <Form.Label> Actors - Cast </Form.Label>

                                {this.props.actors.map((actor, index) =>
                                    <div>
                                        <input type="checkbox" name="actors" value={index} onChange={this.changeHandler} />
                                        {actor.fullName}
                                    </div>
                                )}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label> Gender </Form.Label>

                                {this.state.movieDrama.genders.map((gender, index) =>
                                    <div>
                                        <input type="checkbox" name="genders" value={index} onChange={this.changeHandler} />
                                        {gender.name}
                                    </div>
                                )}
                            </Form.Group>



                        </div>

                        <div className="w-full flex flex-row justify-center">
                            <Button onClick={this.handleSubmit} className="btn w-64">Edit Movie - Drama</Button>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}
