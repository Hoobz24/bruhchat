import React from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

class DataAlert extends React.Component {


    constructor(props) {
        super(props);
        this.state = {html: <div></div>};
        this.state = {running: true};
    }


    componentWillMount() {
        if(this.state.running == true) {
            this.props.socket.on('hashEnd', function (data) {
                if (data.success == false) {
                    this.setState({html: <div><p class={"font"}>Password or username is incorrect</p></div>});
                }
                if (data.success == true) {
                    this.setState({html: <Redirect push to={"/dashboard?q=" + this.props.socket.id}></Redirect>})
                }
            }.bind(this));
        }
    }




    render() {
        return (
            <>
                {this.state.html}
            </>
        );
    }
}

export default DataAlert;