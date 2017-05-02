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
            changeLog:[],
        }
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
        const messages = document.querySelector(".messages");
        this.timerId = setInterval(()=>{
            messages.scrollTop = messages.scrollHeight ;
        }, 800);
    }
    componentWillUnmount(){
        clearInterval(this.timerId);
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
            userName: this.props.userName,
        }
        firebase.database().ref("messages/"+newMessage.id).set(newMessage)
        this.setState({
            chatInput:"",
        })

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
                    <p className="name" className={message.userName == this.props.userName ? "left" : "right"}>{message.userName}</p>
                    <p className={message.userName == this.props.userName ? "bubble" : "bubbleRight"}>{message.text}</p>
                    <p>{this.state.changeLog[i]}</p>
                </li>)
            });
            return ( <div className="chat">
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
