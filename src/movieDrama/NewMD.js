import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import swal from 'sweetalert';
import Footer from '../Footer';

export default class NewMD extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movieDrama: {
                actors: [],
                genders: []
            }
        }
    }
    changeHandler = (event) => {
        const attributeToChange = event.target.name;

        const newValue = event.target.value;

        const updatedMD = { ...this.state.movieDrama }
        //for actors
        if (attributeToChange === 'actors') {
            if(event.target.checked){
                console.log(newValue);
                console.log(this.props.actors[parseInt(newValue)]);
                updatedMD[attributeToChange].push(this.props.actors[parseInt(newValue)]);
            }else{
                updatedMD[attributeToChange].splice(updatedMD[attributeToChange].findIndex((x) => x.id == this.props.actors[parseInt(newValue)].id),1);
            }
          
        } else if (attributeToChange === 'genders') {
            if(event.target.checked){
                console.log(newValue);
                console.log(this.props.genders[parseInt(newValue)]);
                updatedMD[attributeToChange].push(this.props.genders[parseInt(newValue)]);
            }else{
                updatedMD[attributeToChange].splice(updatedMD[attributeToChange].findIndex((x) => x.id == this.props.genders[parseInt(newValue)].id),1);
            }
          
        }else{
            updatedMD[attributeToChange] = (newValue);
        }

        //for genders
    //    else{
    //         updatedMD[attributeToChange] = (newValue);
    //     }
        console.log(updatedMD);

        this.setState({
            movieDrama: updatedMD
        })
    }

    handleSubmit = () => {
        if (this.validate()) {
            this.props.addMD(this.state.movieDrama)
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
            <div className="newMdBg bg-cover pt-4">
                <div class="container-md flex flex-col   w-full justify-center  bg-gray-100  rounded-2xl shadow p-10 mb-12 ">
                    {/* <Container> */}
                        <h2 className="text-center opacity-75 mb-5">Add Movie - Drama </h2>
                        <div className=" flex flex-row w-full mb-3">
                        <div className="w-3/4 flex flex-col">

                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>Title</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="title" type="text" name="title" onChange={this.changeHandler} placeholder="Voice"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Release Date </Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="releaseYear" type="date" name="releaseYear"  onChange={this.changeHandler} placeholder="2017-01-20"></Form.Control>
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
                                    <Form.Control as="textarea" id="description" required type="text" name="description"  onChange={this.changeHandler} placeholder="About the crimes ..."></Form.Control>
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Poster URL</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="poster" type="text" name="poster"  onChange={this.changeHandler} placeholder="https://Drama-Movie-Poster.com/"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}> Duration</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="duration" type="text" name="duration"  onChange={this.changeHandler} placeholder="1 hour 30 min"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>  # Of Episods</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="numOfEpisods" type="number" name="numOfEpisods"  onChange={this.changeHandler} placeholder="16"></Form.Control>
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
                                    <Form.Control required id="score" type="text" name="score"  onChange={this.changeHandler} placeholder="9.0"></Form.Control>
                                </Col>
                            </Form.Group>



                        </div>
                        <div className="w-1/4 flex flex-col  pl-5">
                            <Form.Group className="border-2  border-gray-200 rounded-lg pl-5 h-64 overflow-y-scroll shadow-sm">
                                <Form.Label className="text-lg underline"> Actors - Cast </Form.Label>

                                {this.props.actors.map((actor, index) =>
                                    <div>
                                        <input className="mr-3" type="checkbox" name="actors" value={index} onChange={this.changeHandler} />
                                        {actor.fullName}
                                    </div>
                                )}
                            </Form.Group>

                            <Form.Group className="border-2  border-gray-200 rounded-lg pl-5 h-64 overflow-y-scroll shadow-sm">
                                <Form.Label className="text-lg underline"> Gender </Form.Label>

                                {this.props.genders.map((gender, index) =>
                                    <div>
                                        <input  className="mr-3" type="checkbox" name="genders" value={index} onChange={this.changeHandler} />
                                        {gender.name}
                                    </div>
                                )}
                            </Form.Group>



                        </div>
                        
                        </div>
                        <div className="w-full flex flex-row justify-center">
                            <Button onClick={this.handleSubmit} className="btn w-64">Add Movie - Drama</Button>
                        </div>
                        
                    {/* </Container> */}
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
