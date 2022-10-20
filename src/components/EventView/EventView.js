import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Image, Card, Container} from 'semantic-ui-react'
import styles from './EventView.css'
import axios from 'axios'
import GalleryView from '../GalleryView/GalleryView.js'


class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      characters: [],
      results:{}
    };
    console.log("in EventView");
    this.public_key = '7bb9513956ffbcaa3d45247e3f430d59';
    var private_key = '5e4ab8d3c6a10af00ce146e95feaf4d384272cc8';
    this.ts = Date.now();
    var msg = `${this.ts}${private_key}${this.public_key}`;
    var md5 = require('md5');
    this.hash = md5(msg);
    
    this.baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';

   
    this.props.characters.items.map((info,idx)=>{
          var char_id = info.resourceURI.substring(info.resourceURI.length-7,info.resourceURI.length);
          var url = `${this.baseUrl}${char_id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;
          
          
          axios.get(url).then((response) => {
            
            return response.data.data.results[0];
          }).then((character)=>{
              var joined = this.state.characters.concat(character);
              this.setState({characters:joined});
          }).then((response)=>{
          }).then((response)=>{
              this.setState({results:{results:this.state.characters}});

          }).catch((error) => {
            console.log(error);
          });
        });
    }

  render() {
      return (

          <Container className='galleryContainer'>
            <GalleryView characters={this.state.results} />
          </Container>
        
      )
  }
  
}

EventView.propTypes = {
  available: PropTypes.number,
  collectionURI: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
      resourceURI:PropTypes.string,
      name:PropTypes.string,
    })),
}
export default EventView
