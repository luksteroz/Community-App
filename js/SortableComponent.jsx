
import ReactDOM from 'react-dom';
import React from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import Description from './Description.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
import {purple500, blue500} from 'material-ui/styles/colors';
import Title from './Badge.jsx'

class SortableComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          items: this.props.items,
          inputText: "",
          description:"",
          userName:"",
        };
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    }
    handleAddTask=(event, index)=>{
        event.preventDefault();
        console.log(event.currentTarget.index);
        const items = this.state.items.slice();
        const element = {
            id: this.state.items.length,
            task: this.state.inputText,
            description: this.state.description,
            user: this.props.userName,
        }
        items.push(element);
        this.setState({
            inputText: "",
        });
        if (typeof this.props.onAdd === "function") {
            this.props.onAdd(items, this.props.status);
        }
    }
    handleEditTask=(e)=>{
        this.setState({
            inputText: e.target.value,
        });
    }
    handleAddDescription=(description, id)=>{

        const items = this.state.items.slice();
        console.log("co to jest items id",items[id]);
        items[id] = {
            id: items[id].id,
            task: items[id].task,
            description: description,
            user: items[id].user,
        }
        if (typeof this.props.onAdd === "function") {
            this.props.onAdd(items, this.props.status);
        }
    }
    handleChangeColor=(e)=>{
        console.log(e.currentTarget.style.color);
        e.currentTarget.style.color == "yellow" ? e.currentTarget.style.color = "lightgrey" : e.currentTarget.style.color = "yellow"
    }
    handleRemoveTask=(e)=>{
        const items = this.state.items.slice();
        items.splice(e.currentTarget.value, 1)
        this.setState({
            items: items,
        });
        if (typeof this.props.onAdd === "function") {
            this.props.onAdd(items, this.props.status);
        }
    }
    handleMoveItem=(e)=>{
        const items = this.state.items.slice();
        console.log("chce sam element", items[e.currentTarget.value]);
        const element = items[e.currentTarget.value];
        this.handleRemoveTask(e);
        if (typeof this.props.onMove === "function") {
            this.props.onMove(element, this.props.status);
        }
    }
    handleShowDescription=(e)=>{
        e.currentTarget.nextElementSibling.style.display = "block";
    }
    handleSaveTodo=(e)=>{
        this.props.onSave();
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
            return (
            <li className="boardText">
                <a onClick={this.handleChangeColor}
                style={{color: "lightgrey"}}>
                &#9733;
                </a>
                <button onClick={this.handleRemoveTask}
                value={value.id}>
                {this.props.remove}
                </button>
                <button value={value.id}
                onClick={this.handleMoveItem}
                className="move">{this.props.action2}
                </button>
                <Description newDescription={this.handleAddDescription}
                id={value.id}
                description={value}
                task={value.task}
                user={value.user}/>
                <h2>{value.task}</h2>
                <span> Added by {value.user}</span>
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
        return (
        <div>
            <div className="columns">
                <Title status={this.props.status}
                    length={this.state.items.length}
                    onSave={this.handleSaveTodo}/>
                <SortableList items={this.state.items}
                onSortEnd={this.onSortEnd}
                useDragHandle={true}
                helperClass="SortableHelper"/>
            </div>
            <form onSubmit={this.handleAddTask}>
                <MuiThemeProvider>
                    <TextField
                          floatingLabelText="Add new task"
                          floatingLabelStyle={{color: purple500}}
                          floatingLabelFocusStyle={{color: blue500}}
                          value={this.state.inputText}
                          onChange={this.handleEditTask}
                          className="addTask"
                    />
                </MuiThemeProvider>
            </form>
        </div>)
    }
}

export default SortableComponent
