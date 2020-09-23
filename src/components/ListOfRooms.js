import React, { Component } from 'react'
import {Link} from 'react-router-dom';


export default class ListOfRooms extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }




    
    render() { 
        return (
            <div id="listOfRoomsDiv">
                {this.props.rooms.map((item)=>{return <div style={{display:"inline-block", marginLeft:"10px"}}><Link to='/room'><button onClick={()=>{this.props.goToRoom(item)}} className="roomList" style={{backgroundColor:item.color}}><div id="roomNameBg">{item.name}</div></button></Link></div>})}
            </div>
        )
    }
}
