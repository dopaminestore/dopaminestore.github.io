import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { green } from '@material-ui/core/colors';
import * as firebase from "firebase";
import { BrowserRouter, Route,Switch} from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyA_rPzl1D8YouEsSJ1AjQwElFqH_mxOAFI",
  authDomain: "realtime-4a7de.firebaseapp.com",
  databaseURL: "https://realtime-4a7de.firebaseio.com",
  projectId: "realtime-4a7de",
  storageBucket: "realtime-4a7de.appspot.com",
  messagingSenderId: "624733681109",
  appId: "1:624733681109:web:ab5c7b2277fbf1ffd6b95c",
  measurementId: "G-W109P6TCZL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ email: e.target.value, error: '' });
  }

  handleClick(){
    var check = this.state.email.includes('@gmail.com');
    console.log(check);
    if (check == true) {
      const data = {
        'email': this.state.email
      };
      const db = firebase.database().ref().child("dopamine").push(data);
      this.setState({email: ''});
      this.props.history.push('/confirmed');
    }
    else {
      this.setState({ error: 'Invalid format' });
    }
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h3><font className="roboto-font" color="#FFF">The next big fashion store is here, join our waitlist.</font></h3>
          <form  noValidate autoComplete="off">
            <TextField
            color="secondary"
            required
            value={this.state.email}
            id="email"
            label="Email"
            variant="outlined"
            onChange={this.handleChange}
            InputProps={{
              inputProps: {
                style: {
                  width: 200,
                  background: '#fff',
                  borderRadius: 30
                },
              },
              style: {
                borderRadius: 30
              },
              textField: {
                  [`& fieldset`]: {
                    borderRadius: 0,
                  },
              }
            }}
             />
          </form><br />
          <Fab className="roboto-font" onClick={this.handleClick} color="secondary" variant="extended">
            <SendIcon/>&nbsp;
            <font className="roboto-font" color="#FFF">Signup</font>
          </Fab>
        </header>
      </div>
    );
  }
}

class Confirmed extends Component {

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h3><font className="roboto-font" color="#FFF">You've been added to our waitlist.</font></h3>
        </header>
      </div>
    );
  }
}

class Stack extends Component{
  render () {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={App} />
            <Route exact={true} path="/confirmed" component={Confirmed} />
          </Switch>
     </BrowserRouter>
    );
  }
}

export default Stack;
