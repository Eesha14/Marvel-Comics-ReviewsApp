import React, { Component } from 'react';
import {Button, List, Image, Input,  Container  } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styles from './Search.scss';
import ListView from '../List/List.js';
import 'normalize.css';
import axios from 'axios'
import PropTypes from 'prop-types';


class App extends Component {

  constructor() {
    super();

    this.state = {
      value: '',
      characters: {},
      selectedOption:"name",
      selectedOrder:"Ascending",
    };

    var public_key = '7bb9513956ffbcaa3d45247e3f430d59';
    var private_key = '5e4ab8d3c6a10af00ce146e95feaf4d384272cc8';
    var ts = Date.now();
    var msg = `${ts}${private_key}${public_key}`;
    var md5 = require('md5');
    var hash = md5(msg);
    
    this.baseUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${public_key}&ts=${ts}&hash=${hash}&nameStartsWith=`;
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.handleOptionChange= this.handleOptionChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  clickHandler() {
    let url = `${this.baseUrl}${this.state.value}`;
    if (this.state.selectedOption === "name"){
      if(this.state.selectedOrder === "Descending"){
        url = `${url}&orderBy=-name`;
      }else{
        url = `${url}&orderBy=name`;
      }
    }
    if (this.state.selectedOption === "modified"){
      if(this.state.selectedOrder === "Descending"){
        url = `${url}&orderBy=-modified`;
      }else{
        url = `${url}&orderBy=modified`;
      }
    }
    console.log('here');
    console.log(url);
    axios.get(url).then((response) => {
      console.log(response);

      this.setState({
        characters: response.data.data
      });

    }).catch((error) => {
      console.log(error);
      this.setState({
        characters:{}
      });
    });
  }

  inputChangeHandler(event) {
    this.setState({ value: event.target.value });
    this.clickHandler();
  }

  handleOptionChange(event){
    this.setState({ selectedOption: event.target.value});
    console.log(this.state.selectedOption);
    console.log(event.target.value);
    this.clickHandler();
  }

  handleOrderChange(event){
    this.setState({ selectedOrder: event.target.value});
    this.clickHandler();
  }


  render() {
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
        <div className="searchbar">
          <Input
            onChange={this.inputChangeHandler}
            placeholder='Search a character here'
            value={this.state.value}
            className="searchbar_input"
          />
        </div>

        <div className='radiodiv'>
          <form>
              <span className="radioinput">
                <label><input
                  type="radio"
                  value="name"
                  className="form-check-input"
                  checked={this.state.selectedOption === "name"}
                  onChange={this.handleOptionChange}
                  />
                  Name
                </label>
              </span>

              <span className="radioinput">
                <label>
                  <input
                    type="radio"
                    value="modified"
                    className="form-check-input"
                    checked={this.state.selectedOption === "modified"}
                    onChange={this.handleOptionChange}
                  />
                  Changed
                </label>
              </span>
            </form>

            <form>
              <span className="radioinput">
                <label><input
                  type="radio"
                  value="Ascending"
                  className="form-check-input"
                  checked={this.state.selectedOrder === "Ascending"}
                  onChange={this.handleOrderChange}
                  />
                  Ascending
                </label>
              </span>

              <span className="radioinput">
                <label>
                  <input
                    type="radio"
                    value="Descending"
                    className="form-check-input"
                    checked={this.state.selectedOrder === "Descending"}
                    onChange={this.handleOrderChange}
                  />
                  Descending
                </label>
              </span>
            </form>
        </div>

        <div>
          <Container className='listContainer'>
              <ListView characters={this.state.characters} />
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
