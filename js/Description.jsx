import ReactDOM from 'react-dom';
import React from 'react';


class Description extends React.Component{
    constructor(props){
        super(props);
        this.state={
            descipription: "";
        }
    }
    handleChangeDescription=(event)=>{
        this.setState({
            descipription: event.target.value,
        })
    }
    handleAddDescription=(event)=>{

    }
    render(){
        return <div className="descriptionDetail">
            <form onSubmit{this.handleAddDescription}>
                <input type="text"
                value={this.state.description}
                onChange={this.handleChangeDescription}/>
                <input type="submit"/>
            </form>
        </div>
    }
}

export default Description
