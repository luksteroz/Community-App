import ReactDOM from 'react-dom';
import React from 'react';


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
        console.log(this.state.userName.);
        const name = this.state.userName
    }
    handleChangeText=(event)=>{
        this.setState({
            chatInput: event.target.value,
        })
    }
    handleSubmitMessage=(event)=> {
        event.preventDefault();
        const messages = this.state.messages.slice();
        messages.push(this.state.chatInput);
            this.setState({
            chatInput: "",
            messages: messages,
            });
      }
        render(){
            const chat = this.state.messages.map((value, index) => (
                <li key={index}>
                    {value}
                </li>
            ));
            return ( <div className="chat">
            <p> SAY SOMETHING.</p>
            <div className="messages">
                <ul>
                    {chat}
                </ul>
            </div>
            <form onSubmit={this.handleSubmitMessage}>
                <input type="text"
                    name="chatInput"
                    onChange={this.handleChangeText}
                    value={this.state.chatInput}
                    placeholder="Write a message..." />
          </form>
            <form onSubmit={this.handleAddName}>
                <input type="text" value={this.state.userName} onChange={this.handleChangeName} placeholder="Your name.."/>
                <input type="submit"/>
            </form>
          </div>);
        }
    }

    export default ChatApp
