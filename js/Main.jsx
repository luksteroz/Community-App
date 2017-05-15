import ReactDOM from 'react-dom';
import React from 'react';
import	{Router, Route, Link, IndexLink, IndexRoute, hashHistory} from 'react-router';


class Main extends React.Component {
    render(){
        return <section>
                <IndexLink to='/App' className="active">Enter</IndexLink>
        </section>
    }
}

export default Main
