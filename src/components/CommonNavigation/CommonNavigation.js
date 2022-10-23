import React, { Component } from 'react'
import { Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom';


class CommonNavigation extends Component {
  render() {
    return (
    <div>
    <div className="header" id="header">
    <Image src={require("../images/pic1.png")}  className='center'/>
      </div>
    <div className="menu">
        <Link to="/">Search</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
    </div> 
    );
  }
}


export default CommonNavigation
