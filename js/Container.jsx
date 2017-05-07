import ReactDOM from 'react-dom';
import React from 'react';
import {render} from 'react-dom';
import ChatApp from "./ChatApp.jsx";
import Header from "./Header.jsx";
import EnterName from "./EnterName.jsx";
import SortableComponent from "./SortableComponent.jsx";


class Container extends React.Component{
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
        firebase.database().ref("TodoApp/").set(this.state)
    }
    handleAddNewTask=(array, taskList)=>{
        console.log("array????????/",array);
        let curr = "";
        if (taskList === "ToDo") {
            curr = "toDo";
        } else if(taskList === "Doing"){
            curr = "doing";
        }else if (taskList === "Done") {
            curr = "done";
        }
        const items = array.map((value, index)=>{
            return {
                    id: index,
                    task: value.task,
                    description: value.description,
                    user: value.user,
                    }
        });
        this.setState({
            [`${curr}`]: items,
        })
    }

    handleOnMove=(element, taskList)=>{
        let tab = [];
        let curr = "";
        if (taskList === "ToDo") {
            tab = this.state.doing.slice();
            curr = "doing";
        } else if(taskList === "Doing"){
            tab = this.state.done.slice();
            curr = "done";
        }
        tab.push(element);
        this.setState({
            [`${curr}`]: tab,
        });
        console.log("czy doszlo do doing",this.state);
    }
    handleNewName=(username)=>{
        console.log("nowy uzytkownik",username);
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
        <input className="save"
        type="submit"
        value="Save"
        onClick={this.handleSaveTodo}/>
        <EnterName newName={this.handleNewName}/>
    </div>
    }
}

export default Container
