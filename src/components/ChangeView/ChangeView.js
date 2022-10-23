import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container} from 'semantic-ui-react'
import axios from 'axios'
import GalleryView from '../GalleryView/GalleryView.js'


class ChangeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      comics: [],
      results:{}
    };
    console.log("in ChangeView");
    this.public_key = 'fc139ed47676ee20403f196c53afd4eb';
    var priv_key = '63253bdcac2c67cde035f289576f6133045f1593';
    this.ts = Date.now();
    var message = `${this.ts}${priv_key}${this.public_key}`;
    var hashing = require('md5');
    this.hash = hashing(message);
    
    this.baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';
    console.log("hhhhhh");
    console.log(this.props.comics);
    this.props.comics.items.map((info,idx)=>{
          var id = info.resourceURI.substring(info.resourceURI.length-7,info.resourceURI.length);
          var url = `${this.baseUrl}${id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;          
          axios.get(url).then((response) => {
            console.log("response");
            console.log(response);
            return response.data.data.results[0];
          }).then((comic)=>{
              var joined = this.state.comics.concat(comic);
              this.setState({comics:joined});
          }).then((response)=>{
              this.setState({results:{results:this.state.comics}});
          }).catch((exception) => {
            // console.log("hhhhhh");
            console.log(exception);
          });
          return id;
        });
        
    }

  render() {
      return (
        <Container>
            <GalleryView comics={this.state.results} />
          </Container>
      )
  }
  
}

ChangeView.propTypes = {
  available: PropTypes.number,
  collectionURI: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
      resourceURI:PropTypes.string,
      name:PropTypes.string,
    })),
}
export default ChangeView
