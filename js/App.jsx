import ReactDOM from 'react-dom';
import React from 'react';
import Container from './Container.jsx'
import Main from './Main.jsx'
import Description from './Description.jsx'
import	{Router, Route, Link, IndexLink, IndexRoute, hashHistory} from 'react-router';



class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <Router history={browserHistory}>
			<Route path='/' component={Main}/>
			<Route path='/App'	component={Container}/>
		</Router>;
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById('app'));
