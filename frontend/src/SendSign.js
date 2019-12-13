import React from "react";
import io from "socket.io-client";
import socket from "socket.io-client";
import {sendSign} from "./App";
import DataAlert from "./DataAlert";

class SendSign extends React.Component {
    constructor(props) {
        super(props);

        this.state = {subUsername: ""};
        this.state = {subPassword: ""};
        this.state = {html: <div></div>};
    }


    handleSub() {

        this.setState({

        }, function() {

            const username = this.state.username;
            const password = this.state.password;
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";

            this.props.socket.emit('userForm', {
                username: username,
                password: password,
                id: this.props.socket.id
            });

        });

    }

    usernameChange(e){
        this.setState({username: e.target.value});

    }

    passwordChange(e){
        this.setState({password: e.target.value});
    }

    render(){
        return(
            <div>
                <input type="text" id="username" placeholder={"Username"}  onChange={this.usernameChange.bind(this)}></input>
                <br></br>
                <br></br>
                <input type="text" id="password"  placeholder={"Password"} onChange={this.passwordChange.bind(this)}></input>
                <br></br>
                <br></br>
                <button type="button" className="myButton" onClick={this.handleSub.bind(this)}
                        name="button">Submit
                </button>
                <DataAlert socket={this.props.socket}>
                </DataAlert>
            </div>

        );
    }




}




export default SendSign;