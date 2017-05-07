import ReactDOM from 'react-dom';
import React from 'react';


class Description extends React.Component{
    constructor(props){
        super(props);
        this.state={
            description: this.props.description.description,
        }
    }
    handleChangeDescription=(e)=>{
        this.setState({
            description: e.currentTarget.value,
        })
    }
    handleAddDescription=(e)=>{
        e.preventDefault();
        console.log(e.currentTarget.parentElement.parentElement);
        e.currentTarget.parentElement.parentElement.style.display = "none";
        if (typeof this.props.newDescription === "function") {
            this.props.newDescription(this.state.description, this.props.id);
        }
    }
    handleHideDescription=(e)=>{
        e.currentTarget.parentElement.parentElement.style.display = "none";
    }
    render(){
        return <div className="descriptionBackground">
            <form className="description"
                onSubmit={this.handleAddDescription}>
                <p onClick={this.handleHideDescription}>X</p>
                <h1>{this.props.task}</h1>
                <span>Added by {this.props.user}</span>
                <textarea type="text"
                value={this.state.description}
                onChange={this.handleChangeDescription}/>
                <input type="submit" value="zatwierdź"/>
            </form>
        </div>
    }
}

export default Description
