// import ReactDOM from 'react-dom';
// import React from 'react';
// import	{Router, Route, Link, IndexLink, IndexRoute, hashHistory} from 'react-router';
// import EnterName from "./EnterName.jsx";
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import IconMenu from 'material-ui/IconMenu';
// import IconButton from 'material-ui/IconButton';
// import FontIcon from 'material-ui/FontIcon';
// import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
// import MenuItem from 'material-ui/MenuItem';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import RaisedButton from 'material-ui/RaisedButton';
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
// import injectTapEventPlugin from 'react-tap-event-plugin';
//
//
//
//
// class Main extends React.Component {
//     constructor(props){
//         super(props)
//         this.state={
//             user: "",
//         }
//     }
//     handleLogIn=(e)=>{
//         var auth = firebase.auth();
//         var provider = new firebase.auth.GoogleAuthProvider();
//         auth.getRedirectResult(provider).then((result) => {
//             const token = result.credential.accessToken;
//             const user = result.user;
//             const userId = user.uid;
//             const name = user.displayName;
//             const photo = result.user.photoURL;
//             alert('Witaj ' + name);
//             firebase.database().ref("currentUser/").set(name)
//         }).catch((error) => {
//             console.log(error);
//             var errorMessage = error.message
//             console.log(errorMessage);
//         });
//     }
//     render(){
//         // <form onSubmit={this.handleAddName}>
//         //     <input type="text" value={this.state.userName}
//         //     onChange={this.handleChangeName}
//         //     placeholder="Enter Your name.."
//         //     required
//         //     autoFocus />
//         // </form>
//         // <Link to='/App' className="active">Enter</Link>
//
//
//
//         return (
// <div className="enterName">
//     <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
//         <Toolbar>
//             <ToolbarGroup firstChild={true}>
//                 <DropDownMenu value={this.state.value} onChange={this.handleChange}>
//                     <MenuItem value={1} primaryText="About me" />
//                     <MenuItem value={2} primaryText="My projects" />
//                 </DropDownMenu>
//             </ToolbarGroup>
//             <ToolbarGroup>
//                 <ToolbarTitle text="Options" />
//                     <FontIcon className="muidocs-icon-custom-sort" />
//                 <ToolbarSeparator />
//                 <RaisedButton label="Log in"
//                     tooltip="Listings"
//                     primary={true}
//                     onClick={this.handleLogIn}
//                     containerElement={<Link to="/App"/>}/>
//                 <IconMenu iconButtonElement={
//                     <IconButton touch={true}>
//                     <NavigationExpandMoreIcon />
//                     </IconButton>}>
//                     <MenuItem primaryText="Documentation" />
//                     <MenuItem primaryText="More Info" />
//                 </IconMenu>
//             </ToolbarGroup>
//         </Toolbar>
//     </MuiThemeProvider>
// </div>)
//     }
// }
//
// export default Main
