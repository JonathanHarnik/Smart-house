import React, { Component } from 'react'

export default class Products extends Component {
    constructor(props) {
        super(props)
    
        this.state = {

        }
    }

    color=(item)=>{
        if(item.flag==true){
            return "green" 
        }
        else{
            return "red"
        }
    }


    
    render() {
        return (
            <div id="prodDiv">
                <div id="listOfProd">
                    {this.props.listOfProd.map((item, index)=>{if(item.name==''){return <div></div>}else{return <button onClick={()=>{this.props.setColor(item, index)}} style={{backgroundColor:this.color(item)}} className="products">{item.name}</button>}})}
                </div>
            </div>
        )
    }
}
