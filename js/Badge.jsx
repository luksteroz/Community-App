import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class Title extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSaveTodo=() => {
        this.props.onSave();
    }
    render() {
        const Notify = () => {
            return <Badge
                badgeContent={ this.props.length }
                secondary={ true }
                badgeStyle={ {top: 20, right: 20} }>
                <IconButton
                  tooltip="Tasks left">
                <NotificationsIcon />
                </IconButton>
            </Badge>;
        };

        const Menu = () => {
            return <IconMenu
                      iconButtonElement={
                          <IconButton >
                              <MoreVertIcon />
                          </IconButton>
                      }
                      anchorOrigin={ {
                          horizontal: 'right',
                          vertical: 'top'
                      } }
                      targetOrigin={ {
                          horizontal: 'right',
                          vertical: 'top'
                      } }>
                <MenuItem
                    primaryText="Save"
                    className="itemSave"
                    onClick={ this.handleSaveTodo }
                />
            </IconMenu>;
        };

        return <MuiThemeProvider>
            <AppBar
                style={ {padding: '10px', textAlign: 'center'} }
                title={
                    <h1>{this.props.status}</h1>
                }
                iconElementRight={ <Menu /> }
                iconElementLeft={ <Notify /> }
                className="title-column"
            />
        </MuiThemeProvider>;
    }
}

export default Title;
