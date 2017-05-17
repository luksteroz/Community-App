
import ReactDOM from 'react-dom';
import React from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import Description from './Description.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {purple500, blue500} from 'material-ui/styles/colors';
import Title from './Badge.jsx'
import {Snackbar, RaisedButton, TextField, Paper} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';



class SortableComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          items: this.props.items,
          inputText: "",
          description:"",
          userName:"",
          open: false,
          display: "block",
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
            open: true,
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
                <FlatButton label={this.props.remove}
                 value={value.id}
                 secondary={true}
                 onClick={this.handleRemoveTask}/>
                <FlatButton label= {this.props.action2}
                value={value.id}
                onClick={this.handleMoveItem}/>
                <h2>{value.task}</h2>
                <Description newDescription={this.handleAddDescription}
                id={value.id}
                description={value}
                task={value.task}
                user={value.user}/>
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
        console.log(this.props.userName, "nazwa");
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
                <div>
                    <TextField
                          floatingLabelText="Add new task"
                          floatingLabelStyle={{color: "white"}}
                          floatingLabelFocusStyle={{color: "white"}}
                          value={this.state.inputText}
                          fullWidth={true}
                          onChange={this.handleEditTask}
                          className="addTask"
                          style={this.props.userName === "Unknown user" ? {display: "block", backgroundColor:"rgba(232, 0, 82,0.8)"} : {display: "block"}}/>
                    <Snackbar
                        open={this.state.open}
                        message="New task added to your list! :)"
                        autoHideDuration={4000}
                        style={{textAlign: "center"}}/>
                </div>
                </MuiThemeProvider>
            </form>
        </div>)
    }
}

export default SortableComponent
