import React from 'react'
import './style.css'

class RoomList extends React.Component {
    render() {
      const orderedRooms = [...this.props.rooms].sort((a,b) => a.id - b.id)
       return (
         <div className="roomList">
         <ul>
          <h3 className="chatRoom"> ChatGroups</h3>
          {orderedRooms.map(room => {
           var active = this.props.roomId === room.id ? "active" : "";
            return (
              <li key={room.id} className={"room"+ active} onClick={() => { this.props.subscribeToRoom(room.id)}}>
                  # {room.name}
               </li>
            )
          }
          )}
          </ul>
         </div>
       )
    }
}

export default RoomList
