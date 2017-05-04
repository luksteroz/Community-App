import ReactDOM from 'react-dom';
import React from 'react';
import {render} from 'react-dom';
import ChatApp from "./ChatApp.jsx";
import Header from "./Header.jsx";
import EnterName from "./EnterName.jsx";
import SortableComponent from "./SortableComponent.jsx";


class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            toDo:[],
            doing:[],
            done: [],
        }
    }
    // componentDidMount(){
    //     firebase.database().ref("TodoApp/").on("value", (snapshot)=>{
    //     const currentMessages = snapshot.val()
    //     console.log("ladowanie", currentMessages.toDo);
    //         if (currentMessages.toDo != null) {
    //             console.log("todo");
    //             this.setState({
    //                 toDo: currentMessages.toDo,
    //             })
    //         }if (currentMessages.doing != null) {
    //             this.setState({
    //                 doing: currentMessages.doing,
    //             })
    //         }if (currentMessages.done != null) {
    //             this.setState({
    //                 done: currentMessages.done,
    //             })
    //         }
    //     })
    // }
    // handleSaveTodo=(event)=>{
    //     firebase.database().ref("TodoApp/").set(this.state)
    // }
    // handleAddNewTask=(array, taskList)=>{
    //     console.log(array);
    //     let curr = "";
    //     if (taskList === "ToDo") {
    //         curr = "toDo";
    //     } else if(taskList === "Doing"){
    //         curr = "doing";
    //     }else if (taskList === "Done") {
    //         curr = "done";
    //     }
    //     this.setState({
    //         [`${curr}`]: array,
    //     })
    // }
    // handleOnMove=(element, taskList)=>{
    //     let tab1 = [];
    //     let tab2 = [];
    //     let curr = "";
    //     let next = "";
    //     if (taskList === "ToDo") {
    //         tab1 = this.state.toDo.slice();
    //         tab2 = this.state.doing.slice();
    //         curr = "toDo";
    //         next = "doing";
    //     } else if(taskList === "Doing"){
    //         tab1 = this.state.doing.slice();
    //         tab2 = this.state.done.slice();
    //         curr = "doing";
    //         next = "done";
    //
    //     }else if (taskList === "Done") {
    //         this.setState({
    //             done: [],
    //         })
    //     }
    //     tab1 = tab1.filter(item => {
    //         return item !== element;
    //     });
    //     tab2.push(element);
    //     this.setState({
    //         [`${curr}`]: tab1,
    //         [`${next}`]: tab2,
    //     });
    // }
    handleNewName=(username)=>{
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
