import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class AddRooms extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            type:'',
            name:'',
            color:'',
        }
    }
    
    setType=(e)=>{
        this.setState({type:e.target.value});
    }

    setName=(e)=>{
        this.setState({name:e.target.value});
    }
    setColor=(e)=>{
        this.setState({color:e.target.value});
    }
    
    render() {
        
        return (
            <div id="addRoomBody">
                <div id="addRoomsDiv">
                    <h2 id="addRoomHeader">Add Room</h2>
                    <select onChange={this.setType} id="roomSelect">
                        <option value="" disabled selected>select room</option>
                        <option value="Bedroom">Bedroom</option>
                        <option value="Bathroom">Bathroom</option>
                        <option value="Kitchen">Kitchen</option>
                    </select>

                    <br/>
                    <input onChange={this.setName} placeholder="Room name" className="input" maxLength='5'></input>
                    <br/>
                    <br/>
                    <input onChange={this.setColor} placeholder="Room color" className="input"></input>
                    <br/>
                    <Link to='/'><button onClick={()=>{this.props.addRoom(this.state.type, this.state.name, this.state.color)}} id="addRoomBtn">Add Room</button></Link>
                    
                </div>
            </div>
        )
    }
}
