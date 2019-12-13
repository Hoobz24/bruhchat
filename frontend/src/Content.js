import React, {ReactDOM} from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


class Content extends React.Component {



    constructor(props) {

        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);

        this.state = {
            htmlComp: [""],
            comps: [""],
            name: "",
            redirect: <></>
        };


    }

    scrollToTop() {
        scroll.scrollToTop();
    }
    scrollTo() {
        scroller.scrollTo('scroll-to-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    loadPrevious(){

    }

    componentDidMount() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });

        this.props.socket.emit('nameRequest', {
           userid: this.props.socket.id
        });

        this.props.socket.on('nameTrue', function(data){
            this.setState({name: data.name});
            console.log(data.name);
        }.bind(this));

        this.props.socket.on('nameFalse', function(data){
            this.setState({redirect: <Redirect push to={"/"}></Redirect>});
        }.bind(this));

        this.props.socket.on('duplicate', function(data){
            this.setState({redirect: <Redirect push to={"/"}></Redirect>});
        }.bind(this));


        this.props.socket.on('message', function(data){

            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;

            let mi = "[" + dateTime + "] " + data.sender + ": " + data.message;

            this.setState({htmlComp: this.state.htmlComp.concat(mi)});

            console.log(this.state.htmlComp);

            this.setState({comps: this.state.htmlComp.map((item) => <p>{item}</p>)});

            document.getElementById("con").scrollTop = document.getElementById("con").scrollHeight;

        }.bind(this));
    }


    sendData(){
        console.log("sending");
        if(this.state.message != undefined && this.state.message != "") {
            this.props.socket.emit('message', {
                message: this.state.message,
                sender: this.state.name
            })
        }
    }

        messageChange(e){
        this.setState({message: e.target.value});
    }


    render() {
        return (
            <>
                <div className="text-container">
                    <h1 className="font">Bruh Chat</h1>
                    <h3 className="font" id="nameField"></h3>
                    <div id={"con"} className={"data-container"}>
                        {this.state.comps}
                    </div>
                    <br></br>
                    <button id="sender" className="sendButton" onClick={this.sendData.bind(this)}>Send</button>
                    <input id="input" type="text" className="sendInput" id="message" onChange={this.messageChange.bind(this)}></input>
                </div>
                {this.state.redirect};
            </>
        );
    }

}

export default Content;