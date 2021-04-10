import React, { Component } from 'react'
import Footer from '../Shared/Footer';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
class Login extends Component {

    //craete empty state - new version
    state = {}

    //shortest way 
    changeHandler = (e) => {
        let temp = { ... this.state }
        temp[e.target.name] = e.target.value;
        this.setState(temp)
        console.log(temp);
    }


    loginHandler = () => {
        this.props.login(this.state)
        this.props.show(); //show the sections in the root/home
        this.props.history.push('/');
    }

    render() {

        return (
            <div className=" pt-4">
                <div class="w-full mb-5">
                    <h2 className="text-center opacity-75 text-2xl mb-2">Login for your account</h2>
                    <h4 className="text-xs text-center opacity-50 mb-5">In order to use FavOne wesite with full featues, you will need to login to your account. Is this your first time? you can Join Now</h4>
                    <div className="flex flex-col w-4/4 items-center">

                        <TextField label="Email Address" type="email" name="emailAddress" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />

                        <TextField  label="Password" type="password" name="password" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />

                        <Button onClick={this.loginHandler} className="w-64">Login</Button>


                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
export default withRouter(Login);

