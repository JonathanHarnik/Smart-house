import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import AddProduct from './AddProduct.js';
import Products from './Products.js';


export default class Room extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            flag: false,
            products:[],
        }
    }


    setFlagTrue=()=>{
        // flag sets if or not to see the addProduct component
        this.setState({flag:true})
    }

    show=()=>{
        if(this.state.flag==false){
            // returning an empty div to have the same space weather or not we see the addProduct component - so buttons wont move up and down
            return <div id="emptyAddProdDiv"></div>
        }
        else if(this.state.flag==true){
            return <div><AddProduct addProdBtn={this.addProdBtn} roomProd={this.props.roomProd} roomType={this.props.type} counter={this.props.counter}/></div>
        }
    }

    addProdBtn=(product)=>{
        // why length>4 works? but >5 lets you choose 6 products?
        if(this.props.roomProd.length>4){
            alert ("You reached maximum number of products for this room")
        }
        else{
        // gets the type of product selected
        // Sets the this.state.products[] - adds the chosen products to be maped in Products.js
        this.setState({products:[... this.state.products, product]})
        // setting flag to false removes the Add Product component
        this.setState({flag:false})
        // setting the products in app.js within the apropriate this.state.rooms object - sends the selected product+room name to match
        this.props.setProd(product, this.props.name)
        }
    }
    showProd=()=>{
        // asking for the chosen room's products from App.js to send to Products component
      return this.props.roomProd
    }
    
    
    render() {
        return (
            <div>
                <div id="roomBody">
                    <div id="roomInfo">
                        <p>Room name: {this.props.name}</p>
                        <p>Room type: {this.props.type}</p>
                        
                    </div>
                    <div id="addProdDiv">
                    {/* this.show selects according to flag if to show the AddProduct component or not */}
                    {this.show()}
                    </div>
            
                    <div id="roomBtnsDiv">
                        <button onClick={this.setFlagTrue} className="roomBtns">Add Product</button>
                        <Link to='/' onClick={this.props.setFlag}><button className="roomBtns">Home</button></Link>
                    </div>
                </div>
                <div><Products listOfProd={this.props.roomProd} setColor={this.props.setColor}/></div>
            </div>
        )
    }
}
