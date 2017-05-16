import ReactDOM from 'react-dom';
import React from 'react';
import	{Router, Route, Link, IndexLink, IndexRoute, hashHistory} from 'react-router';
import EnterName from "./EnterName.jsx";


class Main extends React.Component {
    constructor(props){
        super(props)
        this.state={
            userName: "",
        }
    }
    handleChangeName=(event)=>{
        this.setState({
            userName: event.target.value,
        })
    }
    render(){
        return <section>
        <div className="enterName">
            <form onSubmit={this.handleAddName}>
                <input type="text" value={this.state.userName}
                onChange={this.handleChangeName}
                placeholder="Enter Your name.."
                required
                autoFocus />
            </form>
        </div>
        <Link to='/App' className="active">Enter</Link>
        </section>
    }
}

export default Main
