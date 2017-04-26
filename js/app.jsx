import ReactDOM from 'react-dom';
import React from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';




class Header extends React.Component {
    render(){
        return <header>
        <span></span>
        </header>
    }
}

class SortableComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          items: this.props.items,
          inputText: "",
          descriptionText:"",
        };
    }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  }
  handleAddTask=(event)=>{
      event.preventDefault();
      const items = this.state.items.slice();
      items.push(this.state.inputText);
      this.setState({
          items: items,
          inputText: "",
      });
      if (typeof this.props.onAdd === "function") {
          this.props.onAdd(items, this.props.status);
      }
  }
  handleEditTask=(event)=>{
      this.setState({
          inputText: event.target.value,
      });
  }
  handleEditDescription=(event)=>{
      console.log("dziala");
      this.setState({
          descriptionText: event.target.value,
      });
  }
  handleChangeColor=(event)=>{
      console.log(event.currentTarget.style.color);
      event.currentTarget.style.color == "yellow" ? event.currentTarget.style.color = "lightgrey" : event.currentTarget.style.color = "yellow"
  }
  handleRemoveTask=(e)=>{
      const items = this.state.items.slice();
      const element = items.indexOf(e.currentTarget.value);
      items.splice(element, 1)
      this.setState({
          items: items,
      });
  }
  handleMoveItem=(e)=>{
    const element = e.currentTarget.value;
    if (typeof this.props.onMove === "function") {
        this.props.onMove(element, this.props.status);
    }
  }
  componentWillReceiveProps(nextProps){
      this.setState({
          items: nextProps.items,
          })
  }
  render() {
      const DragHandle = SortableHandle(() =>
          <p className="dragLine">&#8691;</p>
      );
      const SortableItem = SortableElement(({value, index}) =>{
        console.log(this.state, "sortable");
        return (<li className="boardText">
        <a onClick={this.handleChangeColor.bind(this)}
        style={{color: "lightgrey"}}>
        &#9733;</a>
        <button onClick={this.handleRemoveTask}
        value={value}>
            {this.props.remove}
        </button>
        <button value={value} onClick={this.handleMoveItem}>{this.props.action2}</button>
        <h2>{value}</h2>
            <DragHandle />
        </li>)
    });


      const SortableList = SortableContainer(({items}) => {
        return (
          <ul className="contentColumn">
            {items.map((value, index) => {
            return (<SortableItem key={`item-${index}`}
              index={index}
              value={value}/>
          )})}
          </ul>
        );
    });
    return <div>
    <div className="columns">
        <h1>{this.props.status}<span>({this.state.items.length} tasks left)</span></h1>
        <SortableList items={this.state.items} onSortEnd={this.onSortEnd}
        useDragHandle={true} helperClass="SortableHelper"/>
    </div>
        <form onSubmit={this.handleAddTask}>
            <input type="text"
            name="newTask"
            placeholder="New task..."
            value={this.state.inputText} onChange={this.handleEditTask}/>
        </form>
    </div>
  }
}

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
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            toDo:[],
            doing:[],
            done: [],
        }
    }
    handleAddNewTask=(array, taskList)=>{
        let curr = "";
        if (taskList === "ToDo") {
            curr = "toDo";
        } else if(taskList === "Doing"){
            curr = "doing";
        }else if (taskList === "Done") {
            console.log("done");
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
        }
        tab1 = tab1.filter(item => {
            return item !== element;
        });

        // const find = tab1.indexOf(element);
        // console.log(find, "czym jest find??????");
        // tab1 = tab1.splice(find,1);
        tab2.push(element);
        this.setState({
            [`${curr}`]: tab1,
            [`${next}`]: tab2,
        });
        console.log(this.state, "czy state sie updatuje");
    }
    render(){
        return <div>
        <Header/>
        <div className="container">
            <SortableComponent items={this.state.toDo} onMove={this.handleOnMove} onAdd={this.handleAddNewTask} status="ToDo" remove="Remove" action2="Doing"/>
            <SortableComponent items={this.state.doing} onMove={this.handleOnMove} onAdd={this.handleAddNewTask} status="Doing" remove="Remove" action2="Done"/>
            <SortableComponent items={this.state.done} onMove={this.handleOnMove} onAdd={this.handleAddNewTask} status="Done" remove="Remove" action2="Clear"/>
            <ChatApp/>
        </div>;
    </div>
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById('app'));
