import ReactDOM from 'react-dom';
import React from 'react';
import Container from './Container.jsx'
import Description from './Description.jsx'

class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        // return <Router history={hashHistory}>
        //  <Route path='/' component={App}/>
        // </Router>;
        return <Container/>
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById('app'));
