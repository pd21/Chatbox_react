import React from 'react'
import './style.css';

class SendMessageForm extends React.Component {

  constructor(){
     super();
     this.state = {
       message : ''
     }

     this.handleChange =this.handleChange.bind(this);
     this.handleSubmit =this.handleSubmit.bind(this);
  }

   handleChange(e){
        this.setState({
           message : e.target.value
      })
   }

   handleSubmit(e){
     e.preventDefault()
     this.props.sendMessage(this.state.message)
     this.setState({
       message : ''
     })
   }

    render() {
       return (
         <form
         onSubmit={this.handleSubmit}
         className="sendMessageForm">
         <input
              id="new_message"
              onChange = {this.handleChange}
              value={this.state.message}
              placeholder="Type your message and hit enter"
              type="text"/>
         </form>
       )
    }
}

export default SendMessageForm
