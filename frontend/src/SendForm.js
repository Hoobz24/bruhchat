import React from "react";
import io from "socket.io-client";
import {sendForm} from "./App";
import DataAlert from "./DataAlert";
import AccData from "./AccData";


class SendForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {subUsername:""};
        this.state = {subPassword: ""};
    }

    handleSub() {

        this.setState({

        }, function() {
            let username = this.state.username;
            let password = this.state.password;

            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            sendForm(username, password);

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
              <AccData socket={this.props.socket}>
              </AccData>

          </div>

        );
    }

}

export default SendForm;