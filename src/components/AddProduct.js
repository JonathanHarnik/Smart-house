import React, { Component } from 'react'

export default class AddProduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            type:'',
            counter:0
        }
    }
    
    setType=(e)=>{
        this.setState({type:e.target.value});
    }

    setStereo=()=>{
        if(this.props.counter==0){
            return <option value="Stereo">Stereo</option>
        }
    }
    setBoiler=()=>{
        if(this.props.roomType=="Bathroom"){
            return <option value="Boiler">Boiler</option>
        }
    }
    
    render() {
        return (
            <div id="addProdDiv">
                <select onChange={this.setType} id="prodSelect">
                    <option value="" disabled selected>Select product</option>
                    <option value="Air Condition">Air Condition</option>
                    <option value="Lamp">Lamp</option>
                    {this.setStereo()}
                    {this.setBoiler()}
                </select>
                {/* the button sends the type of product chosen to addProdBtn in rooms */}
                <button onClick={()=>{this.props.addProdBtn(this.state.type)}} id="addProdBtn">Add</button>
            </div>
        )
    }
}
