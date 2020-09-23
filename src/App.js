import React, { Component } from 'react'
import './App.css';
import {BrowserRouter as Router,Switch, Route, Link} from 'react-router-dom';
import HomePage from './Components/HomePage.js';
import AddRooms from './Components/AddRooms.js';
import ListOfRooms from './Components/ListOfRooms.js';
import Room from './Components/Room.js';
import homeImage from './Images/SH_background.jpg';
import addRoomImage from './Images/Smart-Home-addRoom.jpg'
import roomImage from './Images/room.jpg';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      backgroundImage:`url(${homeImage})`,
      // room is made out of [{type, name, color, products[{name, flag}]}]
      rooms:[],
      chosenRoomName:'',
      chosenRoomType:'',
      chosenRoomProd:[],
      // counter is to count if there is a stereo in the room's product
      counter:0,
      flag:false
    }
  }
  
  goToRoom=(item)=>{
    //  item=room object. Setting the room's name, type, products and counter to be shown in state
    this.setState({chosenRoomName:item.name})
    this.setState({chosenRoomType:item.type})
    // also setting (again) the chosenRoomProd so if we re-enter a room we'll see it's products
    this.setState({chosenRoomProd:item.products})
    // setting counter to 1 if there is a stereo in the room so to not include it in the room's products
    item.products.map((item)=>{if(item.name=="Stereo"){this.setState({counter:1})}})
    this.setFlagFalse()
    // changing the background image to Room image
    this.setState({backgroundImage:`url(${roomImage})`})
  }

  setFlagFalse=()=>{
    this.setState({flag:false})
    this.setState({backgroundImage:`url(${addRoomImage})`})
  }
  setFlagTrue=()=>{
    this.setState({flag:true})
    // resetting counter to 0 when showing "list of rooms" in case we enter a room without a stereo from here
    this.setState({counter:0})
    this.setState({backgroundImage:`url(${homeImage})`})
  }

  showListOfRooms=()=>{
    // flag determinds weather or not to show the "list of rooms" component
    if(this.state.flag==true){
      return <div><ListOfRooms rooms={this.state.rooms} goToRoom={this.goToRoom}/></div>
    }
  }

  addRoom=(t, n, c)=>{
    // getting type, name and color from "add rooms" to set rooms[] in state
    this.setState({backgroundImage:`url(${homeImage})`})
    // If type or name are empty (no selecteion was made), show error
    if(t=="" || n==""){
      alert ("Error")
      this.setFlagTrue()
    }
    else{
      // setting room[] and returning flag to true to show "list of rooms" 
      this.setState({rooms:[...this.state.rooms, {type:t, name:n, color:c, products:[]}]})
      this.setFlagTrue()
    }
  }

  setProd=(product, name)=>{
    // recieves selected product and room name to create a new rooms[] with the products chosen
    this.state.rooms.map((item, i)=>{
      if(item.name==name){
        // adding the new product to the products[] of the room
        let tempProd=item.products;
        tempProd.push({name:product, flag:false});
        // resetting the rooms[] with the updates room and its' products
        let tempRoom=item;
        tempRoom.products=tempProd;
        let temp2=this.state.rooms;
        temp2[i]=tempRoom;

        this.setState({rooms:temp2})
        this.setState({chosenRoomProd:tempProd})

        // if product is stereo, we change counter so it wont give stereo as an option again at this point
        if(product=="Stereo"){
          this.setState({counter:1})
        }
      }
    })
  }

  roomProd=()=>{
    // mapping throughout rooms[] to transfer the list of prod of the chosen room to "products" to show all the room's products
    this.state.rooms.map((item)=>{
      if(item.name==this.state.chosenRoomName){
        this.setState({chosenRoomProd:item.products})
      }
    })
    return this.state.chosenRoomProd
  }
  
  setColor=(product, index)=>{
    // changing the product's flag to determind it's on/off mode. 
    this.state.rooms.map((item, i)=>{
      if(item.name==this.state.chosenRoomName){
        // changing the flag within the chosen product 
        let tempProd=item.products;
        tempProd[index].flag=!tempProd[index].flag;
      
        //  resetting the rooms[] with the new flag in the chosen product
        let tempRoom=item;
        tempRoom.products=tempProd;
        let temp2=this.state.rooms;
        temp2[i]=tempRoom;

        this.setState({rooms:temp2})
        this.setState({chosenRoomProd:tempProd})
      }
    })
  } 


  
  
  render() {
    return (
      <div id="body" style={{backgroundImage:this.state.backgroundImage}}>
        <div id="mainHeaderDiv">
          <h1 id="mainHeader">Smart House</h1>
        </div>
        
        <Router>
        {this.showListOfRooms()}
          <Switch>
            <Route exact path='/' component={()=>{return <HomePage setFlag={this.setFlagFalse}/>}}/>
            <Route exact path='/addroom' component={()=>{return <AddRooms addRoom={this.addRoom}/>}}/>
            <Route exact path='/room' component={()=>{return <Room name={this.state.chosenRoomName} type={this.state.chosenRoomType} setFlag={this.setFlagTrue} setProd={this.setProd} 
            roomProd={this.state.chosenRoomProd} counter={this.state.counter} setColor={this.setColor}/>}}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
