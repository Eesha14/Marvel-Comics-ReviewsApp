import React, { Component } from 'react';
import {Button, List, Image, Input,  Container  } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styles from './Gallery.scss';
import 'normalize.css';
import axios from 'axios'
import PropTypes from 'prop-types';
import GalleryView from '../GalleryView/GalleryView.js'
import EventView from '../EventView/EventView.js'


class Gallery extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      characters: {},
      filter: '',
      charlist:{}
    };

    this.public_key = '7bb9513956ffbcaa3d45247e3f430d59';
    var private_key = '5e4ab8d3c6a10af00ce146e95feaf4d384272cc8';
    this.ts = Date.now();
    var msg = `${this.ts}${private_key}${this.public_key}`;
    var md5 = require('md5');
    this.hash = md5(msg);
    

    this.filterUrl = 'https://gateway.marvel.com:443/v1/public/series/';
    this.baseUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}&orderBy=-modified&limit=50`;
    axios.get(this.baseUrl).then((response) => {
      this.setState({
        characters: response.data.data,
        charlist:{}
      });

    }).catch((error) => {
      console.log(error);
    });
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(id) {
    this.setState({filter: ""});
    let url = `${this.filterUrl}${id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;
    console.log(id);
    axios.get(url).then((response) => {
      	this.setState({charlist: response.data.data.results[0].characters});
      	this.setState({filter: id});
      	this.setState({characters:{}});
    }).catch((error) => {
       console.log(error);
    });
    
}

  render() {
  	if (this.state.filter===''){
      console.log(this.state.characters);
  		return (
     	 <div>
     	    <div className="navbar" id="navbar">
           <Image src={require("../assests/marvel-logo.png")}  className='center'/>
            {/* <Image src="https://cdn.freebiesupply.com/logos/large/2x/marvel-logo-png-transparent.png"  className='center'/> */}
          </div>
     	   <div className="menu">
     	        <Link to="/">Search</Link>
              <Link to="/gallery">Gallery</Link>
     	   </div>
     	   <div className="filter">
          {/* 59,314 */}
     	       <a value='52' onClick={() => this.clickHandler('52')}> MARVEL  </a>
     	       <a value='22' onClick={() => this.clickHandler('22')}> DAREDEVIL </a>
     	       <a value='182' onClick={() => this.clickHandler('182')}> X-Treme X-Men  </a>
     	   </div>
     	   <div>
     	     <Container className='galleryContainer'>
     	         <GalleryView characters={this.state.characters} />
     	     </Container>
     	   </div>
     	 </div>
    	);
  	}

  	else{
  		return (
  			<div>
     		   <div className="navbar" id="navbar">
            <Image src={require("../assests/marvel-logo.png")}  className='center'/>
            {/* <Image src="https://cdn.freebiesupply.com/logos/large/2x/marvel-logo-png-transparent.png"  className='center'/> */}
          </div>
     		   <div className="menu">
     		       <Link to="/">Search</Link>
              <Link to="/gallery">Gallery</Link>
     		   </div>
     	 	
     	 		<div className="filter">
     	   		   <a value='52' onClick={() => this.clickHandler('52')}> MARVEL  </a>
     	       	   <a value='12' onClick={() => this.clickHandler('12')}> DAREDEVIL  </a>
     	       	   <a value='182' onClick={() => this.clickHandler('182')}> X-Treme X-Men  </a>
     	   		</div>
     	   		<Container className='galleryContainer'>
     	         <EventView characters={this.state.charlist} />
     	     </Container>
     	   </div>
  		)
  	}
    
  }
}

export default Gallery