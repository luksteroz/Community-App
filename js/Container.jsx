import React from 'react';
import {render} from 'react-dom';
import ChatApp from './ChatApp.jsx';
import Header from './Header.jsx';
import SortableComponent from './SortableComponent.jsx';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            toDo: [],
            doing: [],
            done: [],
            userName: 'Unknown user',
            photo: ''
        };
    }
    componentDidMount() {
        firebase.database().ref('TodoApp/').on('value', (snapshot) => {
            const currentMessages = snapshot.val();

            if (currentMessages.toDo != null) {
                console.log('todo');
                this.setState({
                    toDo: currentMessages.toDo
                });
            }
            if (currentMessages.doing != null) {
                this.setState({
                    doing: currentMessages.doing
                });
            }
            if (currentMessages.done != null) {
                this.setState({
                    done: currentMessages.done
                });
            }
            if (currentMessages.currentUser != null) {
                this.setState({
                    userName: currentMessages.user
                });
            }
        });
    }
    handleSaveTodo=(event) => {
        console.log('działa');
        firebase.database().ref('TodoApp/').set(this.state);
    }
    handleAddNewTask=(array, taskList) => {
        let curr = '';
        if (taskList === 'ToDo') {
            curr = 'toDo';
        }
        else if(taskList === 'Doing') {
            curr = 'doing';
        }
        else if (taskList === 'Done') {
            curr = 'done';
        }
        const items = array.map((value, index) => {
            return {
                id: index,
                task: value.task,
                description: value.description,
                user: value.user
            };
        });

        this.setState({
            [`${ curr }`]: items
        });
    }

    handleOnMove=(element, taskList) => {
        let tab = [];
        let curr = '';

        if (taskList === 'ToDo') {
            tab = this.state.doing.slice();
            curr = 'doing';
        }
        if (taskList === 'Doing') {
            tab = this.state.done.slice();
            curr = 'done';
        }
        tab.push(element);
        this.setState({
            [`${ curr }`]: tab
        });
    }
    handleNewName=(name, photo) => {
        console.log('nowy uzytkownik',name,photo);
        this.setState({
            userName: name,
            photo: photo
        });
    }
    render() {
        return <MuiThemeProvider muiTheme={ getMuiTheme(darkBaseTheme) }>
            <div>
                <Header newName={ this.handleNewName } />
                <div className="container">
                    <SortableComponent items={ this.state.toDo } onMove={ this.handleOnMove } onAdd={ this.handleAddNewTask } status="ToDo" remove="Remove" action2="Doing" userName={ this.state.userName } onSave={ this.handleSaveTodo } />
                    <SortableComponent items={ this.state.doing } onMove={ this.handleOnMove } onAdd={ this.handleAddNewTask } status="Doing" remove="Remove" action2="Done" userName={ this.state.userName } onSave={ this.handleSaveTodo } />
                    <SortableComponent items={ this.state.done } onMove={ this.handleOnMove } onAdd={ this.handleAddNewTask } status="Done" remove="Remove" userName={ this.state.userName } onSave={ this.handleSaveTodo } />
                    <ChatApp userName={ this.state.userName } />
                </div>
            </div>
        </MuiThemeProvider>;
    }
}

export default Container;
