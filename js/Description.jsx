import ReactDOM from 'react-dom';
import React from 'react';


class Description extends React.Component{
    constructor(props){
        super(props);
        this.state={
            description: this.props.description.description,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            description: nextProps.description,
            })
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
                <textarea type="text"
                value={this.state.description}
                onChange={this.handleChangeDescription}/>
                <span onClick={this.handleHideDescription}>X</span>
                <input type="submit" value="zatwierdź"/>
            </form>
        </div>
    }
}

export default Description
