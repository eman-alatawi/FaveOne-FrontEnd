import axios from 'axios';
import React, { Component } from 'react'
import Footer from '../Shared/Footer';
import EditImageGallery from './EditImageGallery';
import ImageGalleryRowCard from './ImageGalleryRowCard';
import {toast } from 'react-toastify';

export default class ImageGalleryIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageGalleries: props.imageGalleries,
            isEdit: false,
            clickedImageGalleryId: ''
        }
    }


    editView = (id) => {
        this.setState({
            isEdit: !this.state.isEdit,
            clickedImageGalleryId: id
        })
    }


    editImageGallery = (imageGallery) => {
        // axios.put(`${process.env.REACT_APP_BACK_END_URL}imagegallery/edit`, imageGallery,
        axios.put("/favone/imagegallery/edit", imageGallery,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("edit imageGallery");
                console.log(response);
                this.props.loadImageGalleries();
                this.props.loadMoviesDramas();
                this.setState({
                  isEdit: false
                })
                toast.success("The Image Gallery has been Edited Successfully!!")

            })
            .catch(error => {
                console.log("error in editing Image Gallery");
                console.log(error);
                toast.error("Error Occured while trying to Edit the Image Gallery. Please try again later")

            })
    }

    deleteImageGallery  = (id) => {
        // axios.delete(`${process.env.REACT_APP_BACK_END_URL}imagegallery/delete`,
        axios.delete("/favone/imagegallery/delete",
            {
                params: { id: id },
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("delete Image Gallery");
                console.log(response);
                this.props.loadImageGalleries();
                toast.success("The Image Gallery has been Deleted Successfully!!")

            })
            .catch(error => {
                console.log("error in deleting Image Gallery");
                console.log(error);
                toast.error("Error Occured while trying to Delete Image Gallery.")
                toast.info("You're not allowed to delete")
            })
    }
    render() {
 
        return (
            <div className=" mainBg bg-cover ">
              
                <div className="w-full">

                    {/* show all image Galleries if the user didn't click the Edit icon - by default show the ImageGalleryRowCard */}
                    {!this.state.isEdit && !this.state.isDetail ?
                        <div>
                            <div className="h-full w-full  ">
                                <h3 className=" my-12  text-center text-gray-900 text-3xl opacity-75">All Image Galleries </h3>
                            </div>
                            <div className="h-full w-full pl-11  inline-grid grid-cols-3 gap-x-1  gap-y-10  mb-4 " >
                                {this.state.imageGalleries.map((imageGallery, index) =>
                                    <div key={index}>
                                    <ImageGalleryRowCard {...imageGallery} moviesDramas={this.props.moviesDramas} isAuth={this.props.isAuth} editView={this.editView} detailView={this.detailView} deleteImageGallery={this.deleteImageGallery} ></ImageGalleryRowCard>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    : null
                    }


                    {/* if the user click the edit icon - show the EditImageGallery [we need to loop again using map to know the clickedImageGalleryId by user and the imageGallery.id in imageGalleries ] */}
                    {this.state.imageGalleries.map((imageGallery, index) =>
                        <div key={index}> 
                        {(this.state.isEdit && this.state.clickedImageGalleryId === imageGallery.id) ? <EditImageGallery imageGallery={imageGallery} editView={this.editView} loadImageGalleries={this.props.loadImageGalleries} moviesDramas={this.props.moviesDramas} editImageGallery={this.editImageGallery} ></EditImageGallery> : null} 
                        </div>
                    )}

                </div>
                <Footer></Footer>
            </div>
        )
    }
}
