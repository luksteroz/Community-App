import ReactDOM from 'react-dom';
import React from 'react';


class Description extends React.Component{
    constructor(props){
        super(props);
        this.state={
            description: this.props.description,
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
        console.log(this.props.id);
        if (typeof this.props.newDescription === "function") {
            this.props.newDescription(this.state.description, this.props.id);
        }
    }
    render(){
        console.log("propsy???",this.props.description);

        return <div>
            <form onSubmit={this.handleAddDescription}>
                <textarea type="text"
                value={this.state.description}
                onChange={this.handleChangeDescription}/>
                <input type="submit" value="zatwierdź"/>
            </form>
        </div>
    }
}

export default Description
