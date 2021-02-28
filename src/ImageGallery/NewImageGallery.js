import React, { Component } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import swal from 'sweetalert';
import Footer from '../Shared/Footer';
import { withRouter } from 'react-router-dom';

class NewImageGallery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageGallery: {
                movieDrama: {}
            }
        }
    }

    changeHandler = (event) => {

        const attributeToChange = event.target.name;

        const newValue = event.target.value;

        const updatedImageGalley = { ...this.state.imageGallery }
        //for adding the  movie-drama to the image Galley that it's related to 
        if (attributeToChange === 'movieDrama') {
            if (event.target.checked) {
                console.log([parseInt(newValue)]);
                updatedImageGalley[attributeToChange] = this.props.moviesDramas[parseInt(newValue)]

            }
        }
        else {
            updatedImageGalley[attributeToChange] = (newValue);
        }

        console.log(updatedImageGalley);

        this.setState({
            imageGallery: updatedImageGalley
        })
    }


    handleSubmit = () => {
        if (this.validate()) {
            this.props.addImageGallery(this.state.imageGallery)
            this.props.history.push('/imageGalleryIndex');

        }
    }


    validate = () => {
        var imageUrl = document.getElementById("imageUrl").value;

        if (imageUrl === '') {
            swal("Empty!!", "The Image Gallery URL Feild is empty!", "error")
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
                    <h2 className="text-center opacity-75 mb-5">Add Image Gallery </h2>
                    <div className=" flex flex-row w-full mb-3">
                        <div className="w-2/4 flex flex-col">

                            <Form.Group  >
                                <Form.Label className="ml-3" > Image Gallery URL</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="imageUrl" type="text" name="imageUrl" onChange={this.changeHandler} placeholder="https://Drama-Movie-Image-Gallery.com/"></Form.Control>
                                </Col>
                            </Form.Group>


                            <Form.Text muted className="pl-4 w-72 text-justify">
                                * If you can't see the Movie/Drama in the list, you should add them first and then come back here.
                            </Form.Text>
                            <Form.Text muted className="pl-4 ">
                                * All the Feilds are required .
                            </Form.Text>

                            <div className="w-full flex flex-row justify-center">
                                <Button onClick={this.handleSubmit} className="btn w-64 mt-4">Add Image Gallery</Button>
                            </div>


                        </div>
                        <div className="w-full flex flex-row ">

                            <div className="flex flex-col w-2/4">
                                <p className="text-center opacity-40">Image preview</p>

                                {/* show Image Gallery */}
                                <div className="   mr-3 flex-row flex justify-center h-56  ">
                                    <img src={this.state.imageGallery.imageUrl} className="w-full bg-contain shadow-md "></img>
                                </div>

                            </div>

                            <div className="flex flex-col w-2/4">
                                <p className="text-center opacity-40">Movie - Drama</p>

                                <Form.Group className="border-2  border-gray-200 rounded-lg pl-5  h-96 overflow-y-scroll shadow-sm">

                                    {this.props.moviesDramas.map((md, index) =>
                                        <div>
                                            <input className="mr-3" type="radio" name="movieDrama" value={index} onChange={this.changeHandler} />
                                            {md.title}
                                        </div>
                                    )}
                                </Form.Group>
                            </div>

                        </div>

                    </div>

                </div>
                <Footer></Footer>
            </div>
        )
    }
}
export default withRouter(NewImageGallery); 
