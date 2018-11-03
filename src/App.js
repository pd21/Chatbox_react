import React, { Component } from 'react';
import './App.css';
import Chatkit from '@pusher/chatkit'

import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import NewRoomForm from './components/NewRoomForm';
import { tokenUrl, instanceLocator} from './config';

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages : []
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator : instanceLocator,
      userId: 'priyanka',
      tokenProvider : new Chatkit.TokenProvider({
        url : tokenUrl
      })
    })
    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.currentUser.subscribeToRoom({
          roomId: 19372576,
          hooks: {
            onNewMessage: message => {

              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text : text,
      roomId : 19372576
    })
  }

  render() {

    return (
      <div className="App">
        <RoomList />
        <MessageList  messages={this.state.messages }/>
        <SendMessageForm sendMessage={this.sendMessage}/>
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
