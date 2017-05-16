import ReactDOM from 'react-dom';
import React from 'react';


class Header extends React.Component {
    handleSaveTodo=(event)=>{
        this.props.onSave();
    }
    render(){
        return <header>
            <div id="logo"></div>
            <input className="save"
            type="submit"
            value="Save"
            onClick={this.handleSaveTodo}/>
        </header>
    }
}

export default Header
