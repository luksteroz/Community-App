import Container from './Container.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Container />;
    }

}
ReactDOM.render(
    <App />,
    document.getElementById('app'));
