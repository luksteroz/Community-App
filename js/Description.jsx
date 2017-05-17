import ReactDOM from 'react-dom';
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';


class Description extends React.Component{
    constructor(props){
        super(props);
        this.state={
            description: this.props.description.description,
            open: false,
            date: null,
        }
    }
    handleOpen = () => {
      this.setState({
          open: true
      });
    };

    handleClose = () => {
      this.setState({
          open: false
      });
      this.props.newDescription(this.state.description, this.props.id);
    }

    handleChangeDate=(e, date)=>{
        console.log(date);
        this.setState({
            date: date,
        });
    }
    handleChangeDescription=(e)=>{
        this.setState({
            description: e.currentTarget.value,
        })
    }
    // handleAddDescription=(e)=>{
    //     e.preventDefault();
    //     console.log(e.currentTarget.parentElement.parentElement);
    //     e.currentTarget.parentElement.parentElement.style.display = "none";
    //     if (typeof this.props.newDescription === "function") {
    //         this.props.newDescription(this.state.description, this.props.id);
    //     }
    // }
    // handleHideDescription=(e)=>{
    //     e.currentTarget.parentElement.parentElement.style.display = "none";
    // }
    render(){
        const actions = [
              <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}/>,
            ];
            return (
            <MuiThemeProvider>
                <div>
                    <RaisedButton label="Details.."
                    onTouchTap={this.handleOpen}
                    style={{width: "100%",
                    height: "18px"}}/>
                    <Dialog
                    title={this.props.task}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                        <form className="description"
                            onSubmit={this.handleAddDescription}>
                            <textarea type="text"
                            className="details"
                            value={this.state.description}
                            onChange={this.handleChangeDescription}/>
                            <p>Added by {this.props.user}</p>
                            <DatePicker hintText="When to do"
                            onChange={this.handleChangeDate}
                            value={this.state.date}/>
                        </form>
                    </Dialog>
                </div>
            </MuiThemeProvider>)

    }
}

export default Description
