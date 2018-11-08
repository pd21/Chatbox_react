import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './home.css';
import MainChatRoom from './MainChatRoom'
import RoomList from './RoomList'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import NewRoomForm from './NewRoomForm'
import { tokenUrl, instanceLocator} from '../config'



class Home extends Component {

  constructor(){
     super();
     this.state = {
       userName: '',
       enterChatRoom: false
     }
     this.handleChange =this.handleChange.bind(this);
     this.handleSubmit =this.handleSubmit.bind(this);
  }

   handleChange(e){
      this.setState({
           userName : e.target.value
      })
   }

   handleSubmit(e){
      if(!this.state.userName){
        return;
      }
      this.setState({
        enterChatRoom: true
      })
   }

  render() {
      if(this.state.enterChatRoom){
          return (
              <MainChatRoom userName={this.state.userName} />
          )
      }else{
        return (
          <form onSubmit={this.handleSubmit}>
            <h4 className="user">Select your Avatar</h4>
            <select onChange = {this.handleChange}>
              <option value="">Select User</option>
              <option value="priyanka">Priyanka</option>
              <option value="swagnik">Swagnik</option>
            </select>
            <br />
            <br />
            <button type="submit">Enter Chat</button>
          </form>
        )
      }

  }
}
export default Home;
