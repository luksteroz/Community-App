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
        const inputs = document.querySelectorAll("input");
        console.log(inputs);
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].style.display = "block";
        }
        enter.style.display = "none";
        enter.nextElementSibling.style.display = "block";
        const name = this.state.userName;
    }
    componentDidMount(){
        firebase.database().ref("messages/").on("value", (snapshot)=>{
        const currentMessages = snapshot.val()
            if (currentMessages != null) {
                this.setState({
                    messages: currentMessages
                })
                console.log(this.state.messages.id);

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
        console.log(this);
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
            // const time = () =>{
            //
            // }
            const time = new Date();
            const minutes = time.getMinutes();
            const hours = time.getHours();
            const month = time.getMonth();
            const day = time.getDate();


            const chat = this.state.messages.map((message, i) => {
                return (<li key={message.id} >
                    <p className="name" className={message.userName == this.state.userName ? "left" : "right"}>{message.userName}</p>
                    <p className={message.userName == this.state.userName ? "bubble" : "bubbleRight"}>{message.text}</p>
                </li>)
            });
            return (
            <div className="chat">
                <div className="enterName">
                    <form onSubmit={this.handleAddName}>
                        <input type="text" value={this.state.userName} onChange={this.handleChangeName} placeholder="Your name.." required autoFocus />
                        <input type="submit" value="Submit" />
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
