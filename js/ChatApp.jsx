import ReactDOM from 'react-dom';
import React from 'react';




const config = {
apiKey: "AIzaSyCqddWFL4sa69b60Apac8S1_p3vvAmh2eE",
authDomain: "chatapp-2b04c.firebaseapp.com",
databaseURL: "https://chatapp-2b04c.firebaseio.com",
projectId: "chatapp-2b04c",
storageBucket: "chatapp-2b04c.appspot.com",
messagingSenderId: "73396890967"
};
firebase.initializeApp(config);




class ChatApp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            messages: [],
            chatInput: "",
            userName: "",
        }
    }
    handleChangeName=(event)=>{
        this.setState({
            userName: event.target.value,
        })
    }
    handleAddName=(event)=>{
        event.preventDefault();
        const enter = document.querySelector(".enterName")
        enter.style.display = "none";
        enter.nextElementSibling.style.display = "block";
        console.log("user name to: ", this.state.userName);
        const name = this.state.userName
    }
    componentDidMount(){
        firebase.database().ref("messages/").on("value", (snapshot)=>{
        const currentMessages = snapshot.val()
            if (currentMessages != null) {
                this.setState({
                    messages: currentMessages
                })
            }
        })
    }
    handleUpdateMessage=(event)=>{
        this.setState({
            chatInput: event.target.value,
        })
    }
    handleSubmitMessage=(event)=> {
        event.preventDefault();
        const newMessage = {
            id: this.state.messages.length,
            text: this.state.chatInput,
            userName: this.state.userName,
        }
        firebase.database().ref("messages/"+newMessage.id).set(newMessage)
        scrollWin(0, 50);
        this.setState({
            chatInput:"",
        })
        // const messages = this.state.messages.slice();
        // messages.push(newMessage);
        // console.log(messages);
        //     this.setState({
        //     chatInput: "",
        //     messages: messages,
        //     });
    }
        render(){
            const chat = this.state.messages.map((message, i) => {
                return (<li key={message.id} >{message.userName} said:<p className="bubble">{message.text}</p>

                </li>)
            });
            return (
            <div className="chat">
                <div className="enterName">
                    <form onSubmit={this.handleAddName}>
                        <input type="text" value={this.state.userName} onChange={this.handleChangeName} placeholder="Your name.." required />
                        <input type="submit"/>
                    </form>
                </div>
                <div className="messages">
                    <p> SAY SOMETHING.</p>
                    <ul>
                        {chat}
                    </ul>
                </div>
                <form onSubmit={this.handleSubmitMessage}>
                    <input type="text"
                        name="chatInput"
                        onChange={this.handleUpdateMessage}
                        value={this.state.chatInput}
                        placeholder="Write a message..."/>
                </form>
          </div>);
        }
    }

    export default ChatApp
