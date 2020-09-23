import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           
        }
    }
    // This component only shows the + button to add a room, but is technically the Home Page

    render() {
        return (
            <div id="homeBody">
                <div id="homeDiv">
                    <div id="homeBtnDiv">
                        <Link to='/addroom'><button onClick={()=>{this.props.setFlag()}} id="homeBtn">+</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}
