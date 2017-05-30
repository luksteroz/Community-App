import React from 'react';

class EnterName extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            userName: ''
        };
    }
    handleChangeName=(event) => {
        this.setState({
            userName: event.target.value
        });
    }
    handleAddName=(event) => {
        event.preventDefault();
        const enter = document.querySelector('.enterName');
        const chat = document.querySelector('.messages');
        const inputs = document.querySelectorAll('input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.display = 'block';
        }
        enter.style.display = 'none';
        chat.style.display = 'block';
        if (typeof this.props.newName === 'function') {
            this.props.newName(this.state.userName);
        }
    }
    render() {
        return (
        <div className="enterName">
            <form onSubmit={ this.handleAddName }>
                <input type="text" value={ this.state.userName }
                    onChange={ this.handleChangeName }
                    placeholder="Enter Your name.."
                    required
                    autoFocus
                />
            </form>
        </div>);
    }
}

export default EnterName;
