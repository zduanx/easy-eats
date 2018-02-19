import React from 'react';
import './App.css';
import Auth from '../Auth/Auth'


class App extends React.Component {

    render (){
        return(
            <button onClick={this.auth}>dfasdfasdf</button>
        );
    }

    auth (){
        const auth = new Auth();
        auth.login();
    }
}


export default App;