import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'


import RoomList from './RoomList'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import NewRoomForm from './NewRoomForm'
import { tokenUrl, instanceLocator} from '../config'

class MainChatRoom extends Component {
  constructor() {
    super()
    this.state = {
      roomId : null,
      messages : [],
      joinableRooms : [],
      joinedRooms :  []

    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  componentDidMount() {
    let { userName } = this.props;
    const chatManager = new Chatkit.ChatManager({
      instanceLocator : instanceLocator,
      userId: userName,
      tokenProvider : new Chatkit.TokenProvider({
        url : tokenUrl
      })
    })
    chatManager.connect()
      .then(currentUser => {
        console.log(JSON.stringify(currentUser));
        this.currentUser = currentUser
        this.getRooms()

      })
      .catch(err => console.log('err on conectiong',err))
  }

  getRooms(){
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
       this.setState({
         joinableRooms,
         joinedRooms: this.currentUser.rooms
       })
    })
    .catch(err => console.log('error on joinable rooms:', err))

  }

  subscribeToRoom(roomId) {
    this.setState({
      messages : []
    }, () => {
      this.currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      })
      .then(room => {
        this.setState({
          roomId : room.id
        })
        this.getRooms()
      })

    });
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text : text,
      roomId : this.state.roomId
    })
  }

  createRoom(name){
      this.currentUser.createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id) )
      .catch(err => console.log("error with createroom", err))
  }

  render() {

    return (
      <div className="App">
        <RoomList
        roomId={this.state.room}
        subscribeToRoom={this.subscribeToRoom}
        rooms={[...this.state.joinableRooms,...this.state.joinedRooms]}/>
        <MessageList  messages={this.state.messages }/>
        <SendMessageForm sendMessage={this.sendMessage}/>
        <NewRoomForm createRoom={this.createRoom}/>
      </div>
    );
  }
}

export default MainChatRoom;
