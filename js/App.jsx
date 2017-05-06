import ReactDOM from 'react-dom';
import React from 'react';
import Container from './Container.jsx'


class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <Container/>
    }

}
ReactDOM.render(
    <App/>,
    document.getElementById('app'));
