import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { IconButton, IconMenu, MenuItem, RaisedButton } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user: 'Unknown User',
            photo: './images/unknownUser.jpg'
        };
    }
    handleSaveTodo=() => {
        this.props.onSave();
    }
    handleSignOut=() => {
        firebase.auth().signOut().then(function() {
            }).catch(function(error) {
        });
    }
    handleLogIn=(e)=> {
        var auth = firebase.auth();

                var provider = new firebase.auth.GoogleAuthProvider();

                auth.signInWithPopup(provider).then((result) => {

                    var token = result.credential.accessToken;

                    var user = result.user;

                    const userId = user.uid;

                    const name = user.displayName;

                    const photo = result.user.photoURL;

                    this.setState({
                        user: name,
                        photo: photo
                    });
                    this.props.newName(name, photo);
                }).catch((error) => {
                    var errorMessage = error.message;

                    console.log(errorMessage);
                });
    }

    render() {
        return <MuiThemeProvider muiTheme={ getMuiTheme(darkBaseTheme) }>
            <div className="header">
                <Toolbar
                style={ {padding: '0',
                    height: '8vh'} }
                >
                    <ToolbarGroup
                        firstChild={ true }
                        style={ {marginLeft: '5%',
                            padding: '0'} }
                    >
                        <IconMenu
                            iconButtonElement={
                                <IconButton>
                                    <ContentFilter />
                                </IconButton> }
                            onChange={ this.handleChangeMultiple }
                            value={ this.state.valueMultiple }
                            multiple={ true }
                        >
                            <MenuItem value="1" primaryText="Log in" />
                            <MenuItem value="2" primaryText="Sign Out" />
                            <MenuItem value="4" primaryText="About Me" />
                            <MenuItem value="5" primaryText="GitHub" />
                        </IconMenu>
                    </ToolbarGroup>
                    <ToolbarGroup style={ {marginRight: '5%'} }>
                        <ListItem
                            disabled={ true }
                            leftAvatar={
                                <Avatar src={ this.state.photo } />
                            }
                        >
                            { this.state.user }
                        </ListItem>
                        <ToolbarSeparator />
                        <RaisedButton label="Log in with Google"
                            tooltip="Listings"
                            primary={ true }
                            onClick={ this.handleLogIn }
                        />
                        <RaisedButton
                            label="Sign Out"
                            style={ {marginRight: '0'} }
                            secondary={ true }
                            onClick={ this.handleSignOut }
                        />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        </MuiThemeProvider>;
    }
}

export default Header;
