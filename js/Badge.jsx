import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import TextField from 'material-ui/TextField';
import {purple500, blue500} from 'material-ui/styles/colors';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class Title extends React.Component{
    constructor(props){
        super(props)
    }
    handleSaveTodo=(e)=>{
        this.props.onSave();
    }
    render(){
        const Notify = ()=>(
            <Badge
                  badgeContent={this.props.length}
                  secondary={true}
                  badgeStyle={{top: 20, right: 20}}>
                  <IconButton tooltip="Tasks left">
                  <NotificationsIcon />
                  </IconButton>
            </Badge>
        );
        const Menu = () =>(
            <IconMenu
                  iconButtonElement={<IconButton ><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                  <MenuItem
                  primaryText="Save"
                  className="itemSave"
                  onClick={this.handleSaveTodo}/>
            </IconMenu>
        );
        return <MuiThemeProvider>
                <AppBar
                    style={{padding: "10px", textAlign: "center"}}
                    title={<h1>{this.props.status}</h1>}
                    iconElementRight={<Menu/>}
                    iconElementLeft={<Notify/>}/>
                </MuiThemeProvider>
    }
}

export default Title
