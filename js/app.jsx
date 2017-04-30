import ReactDOM from 'react-dom';
import React from 'react';
import {render} from 'react-dom';
import ChatApp from "./ChatApp.jsx";
import Header from "./Header.jsx";
import EnterName from "./EnterName.jsx";
import SortableComponent from "./SortableComponent.jsx";






// class ChatApp extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             messages: [],
//             chatInput: "",
//             userName: "",
//         }
//     }
//     handleChangeName=(event)=>{
//         this.setState({
//             userName: event.target.value,
//         })
//     }
//     handleAddName=(event)=>{
//         event.preventDefault();
//         console.log(this.state.userName.);
//         const name = this.state.userName
//     }
//     handleChangeText=(event)=>{
//         this.setState({
//             chatInput: event.target.value,
//         })
//     }
//     handleSubmitMessage=(event)=> {
//         event.preventDefault();
//         const messages = this.state.messages.slice();
//         messages.push(this.state.chatInput);
//             this.setState({
//             chatInput: "",
//             messages: messages,
//             });
//       }
//         render(){
//             const chat = this.state.messages.map((value, index) => (
//                 <li key={index}>
//                     {value}
//                 </li>
//             ));
//             return ( <div className="chat">
//             <p> SAY SOMETHING.</p>
//             <div className="messages">
//                 <ul>
//                     {chat}
//                 </ul>
//             </div>
//             <form onSubmit={this.handleSubmitMessage}>
//                 <input type="text"
//                     name="chatInput"
//                     onChange={this.handleChangeText}
//                     value={this.state.chatInput}
//                     placeholder="Write a message..." />
//           </form>
//             <form onSubmit={this.handleAddName}>
//                 <input type="text" value={this.state.userName} onChange={this.handleChangeName} placeholder="Your name.."/>
//                 <input type="submit"/>
//             </form>
//           </div>);
//         }
//     }
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            toDo:[],
            doing:[],
            done: [],
        }
    }
    componentDidMount(){
        firebase.database().ref("TodoApp/").on("value", (snapshot)=>{
        const currentMessages = snapshot.val()
        console.log("ladowanie", currentMessages.toDo);
            if (currentMessages.toDo != null) {
                console.log("todo");
                this.setState({
                    toDo: currentMessages.toDo,
                })
            }if (currentMessages.doing != null) {
                this.setState({
                    doing: currentMessages.doing,
                })
            }if (currentMessages.done != null) {
                this.setState({
                    done: currentMessages.done,
                })
            }
        })
    }
    handleSaveTodo=(event)=>{
        console.log(this.state);
        // let newMessage = {
        //     toDo: this.state.toDo,
        //     doing: this.state.doing,
        //     done: this.state.done,
        // }
        firebase.database().ref("TodoApp/").set(this.state)
    }
    handleAddNewTask=(array, taskList)=>{
        let curr = "";
        if (taskList === "ToDo") {
            curr = "toDo";
        } else if(taskList === "Doing"){
            curr = "doing";
        }else if (taskList === "Done") {
            curr = "done";
        }
        this.setState({
            [`${curr}`]: array,
        })
    }
    handleOnMove=(element, taskList)=>{
        let tab1 = [];
        let tab2 = [];
        let curr = "";
        let next = "";
        if (taskList === "ToDo") {
            tab1 = this.state.toDo.slice();
            tab2 = this.state.doing.slice();
            curr = "toDo";
            next = "doing";
        } else if(taskList === "Doing"){
            tab1 = this.state.doing.slice();
            tab2 = this.state.done.slice();
            curr = "doing";
            next = "done";

        }else if (taskList === "Done") {
            this.setState({
                done: [],
            })
        }
        tab1 = tab1.filter(item => {
            return item !== element;
        });

        tab2.push(element);
        this.setState({
            [`${curr}`]: tab1,
            [`${next}`]: tab2,
        });
    }
    handleNewName=(username)=>{
        console.log("działa", username);
        this.setState({
            userName: username,
        })
    }
    render(){
        return <div>
        <Header/>
        <div className="container">
            <SortableComponent items={this.state.toDo} onMove={this.handleOnMove} onAdd={this.handleAddNewTask} status="ToDo" remove="Remove" action2="Doing" userName={this.state.userName}/>
            <SortableComponent items={this.state.doing} onMove={this.handleOnMove} onAdd={this.handleAddNewTask} status="Doing" remove="Remove" action2="Done" userName={this.state.userName}/>
            <SortableComponent items={this.state.done} onMove={this.handleOnMove} onAdd={this.handleAddNewTask} status="Done" remove="Remove" userName={this.state.userName}/>
            <ChatApp userName={this.state.userName}/>
        </div>
        <input type="submit" value="Save"
        onClick={this.handleSaveTodo}/>
        <EnterName newName={this.handleNewName}/>
    </div>
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById('app'));
