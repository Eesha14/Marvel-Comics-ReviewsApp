import React, { Component } from 'react';
import {Container  } from "semantic-ui-react";
import './Gallery.css';
import 'normalize.css';
import axios from 'axios';
import GalleryView from '../GalleryView/GalleryView.js';
import ChangeView from '../ChangeView/ChangeView.js';
import CommonNavigation from '../CommonNavigation/CommonNavigation';


class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      comics: {},
      filter: '',
      charlist:{}
    };

    this.public_key = 'fc139ed47676ee20403f196c53afd4eb';
    var priv_key = '63253bdcac2c67cde035f289576f6133045f1593';
    this.ts = Date.now();
    var message = `${this.ts}${priv_key}${this.public_key}`;
    var hashing = require('md5');
    this.hash = hashing(message);
    console.log(message);

    this.filterUrl = 'https://gateway.marvel.com:443/v1/public/series/';
    this.baseUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}&orderBy=-modified&limit=50`;
    axios.get(this.baseUrl).then((response) => {
      console.log("Response");
      console.log(response);
      this.setState({
        comics: response.data.data,
        charlist:{}
      });

    }).catch((exception) => {
      console.log(exception);
    });
    this.cardClick = this.cardClick.bind(this);
  }

  cardClick(id) {
    this.setState({filter: ""});
    let url = `${this.filterUrl}${id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;
    console.log(id);
    axios.get(url).then((response) => {
      console.log("hi");
      console.log(response);
      	this.setState({charlist: response.data.data.results[0].characters});
        console.log("Getting the characters in response");
        console.log(response.data.data.results[0].characters)
      	this.setState({filter: id});
      	this.setState({comics:{}});
    }).catch((exception) => {
       console.log(exception);
    });
    
}

  render() {
  	if (this.state.filter===''){
      console.log("Check whether character is present or not"+this.state.filter);
  		return (
     	 <div>
        <CommonNavigation/>
     	   <div className="checkfilter">
     	       <a href='#!' value='52' onClick={() => this.cardClick('52')}> All Marvel  </a>
     	       <a href='#!' value='22' onClick={() => this.cardClick('22')}> Daredevil </a>
     	       <a href='#!' value='182' onClick={() => this.cardClick('182')}> X-Treme X-Men  </a>
     	   </div>
     	   <div>
     	     <Container>
     	         <GalleryView comics={this.state.comics} />
     	     </Container>
     	   </div>
     	 </div>
    	);
  	}

  	else{
      console.log("Gallery characers are not empty");
  		return (
  			<div>
     		   <CommonNavigation/>
     	 		  <div className="checkfilter">
     	   		     <a href='#!' value='52' onClick={() => this.cardClick('52')}> All Marvel  </a>
     	       	   <a href='#!' value='12' onClick={() => this.cardClick('12')}> Daredevil  </a>
     	       	   <a href='#!' value='182' onClick={() => this.cardClick('182')}> X-Treme X-Men  </a>
     	   		</div>
     	   		<Container>
     	         <ChangeView comics={this.state.charlist} />
     	     </Container>
     	   </div>
  		)
  	}
    
  }
}

export default Gallery