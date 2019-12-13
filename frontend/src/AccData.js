import React from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

class AccData extends React.Component {


    constructor(props) {
        super(props);
        this.state = {html: <div></div>};
        this.state = {running: true};
    }


    componentWillMount() {
            this.props.socket.on('usernameTaken', function (data) {
                this.setState({html: <div><p class={"font"}>Username is taken.</p></div>});

            }.bind(this));

            this.props.socket.on('usernameMade', function (data) {
                this.setState({html: <div><p class={"font"}>Account Created!</p></div>});

            }.bind(this));

    }




    render() {
        return (
            <>
                {this.state.html}
            </>
        );
    }
}

export default AccData;