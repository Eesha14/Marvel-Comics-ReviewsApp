import React, { Component } from 'react';
import {Input} from "semantic-ui-react";
import './Search.css';
import ListView from '../List/List.js';
import 'normalize.css';
import axios from 'axios'
import CommonNavigation from '../CommonNavigation/CommonNavigation';


class Search extends Component {

  constructor() {
    super();

    this.state = {
      value: '',
      comics: {},
      selectedOption:"title",
      selectedOrder:"Ascending",
    };

    var public_key = 'fc139ed47676ee20403f196c53afd4eb';
    var priv_key = '63253bdcac2c67cde035f289576f6133045f1593';
    var ts = Date.now();
    var message = `${ts}${priv_key}${public_key}`;
    var hashing = require('md5');
    var hash = hashing(message);


    this.baseUrl = `https://gateway.marvel.com:443/v1/public/comics?apikey=${public_key}&ts=${ts}&hash=${hash}&titleStartsWith=`;
    this.orderDiff = this.orderDiff.bind(this);
    this.inputelement = this.inputelement.bind(this);
    this.radiocheck= this.radiocheck.bind(this);
    this.handleOption = this.handleOption.bind(this);
  }

  handleOption() {
    let url = `${this.baseUrl}${this.state.value}`;
    if (this.state.selectedOption === "issueNumber"){
      if(this.state.selectedOrder === "Descending"){
        url = `${url}&orderBy=-issueNumber`;
      }else{
        url = `${url}&orderBy=issueNumber`;
      }
    }
    if (this.state.selectedOption === "title"){
      if(this.state.selectedOrder === "Descending"){
        url = `${url}&orderBy=-title`;
      }else{
        url = `${url}&orderBy=title`;
      }
    }
    
    axios.get(url).then((response) => {
      console.log(response);
      this.setState({
        comics: response.data.data
      });

    }).catch((exception) => {
      this.setState({
        comics:{}
      });
    });
  }

  radiocheck(event){
    this.setState({ selectedOption: event.target.value});
    console.log(this.state.selectedOption);
    console.log(event.target.value);
    this.handleOption();
  }

  inputelement(event) {
    this.setState({ value: event.target.value });
    console.log(event.target.value);
    this.handleOption();
  }

  orderDiff(event){
    this.setState({ selectedOrder: event.target.value});
    console.log(event.target.value);
    this.handleOption();
  }


  render() {
    return (
      <div>
        <CommonNavigation/>
        <div className="input_text">
          <Input onChange={this.inputelement} placeholder='Type the name of comic' value={this.state.value} className="input_tag_text"
          />
        </div>

        <div className='filter_choice'>
          <form>
            <label>
              <input type="radio" value="comictitle" checked={this.state.selectedOption === "title"} onChange={this.radiocheck}/>Comic
            </label>
                <label>
                  <input type="radio" value="issueNumber" checked={this.state.selectedOption === "issueNumber"} onChange={this.radiocheck}/>Volume
                </label>

                <label><input type="radio" value="Ascending" checked={this.state.selectedOrder === "Ascending"} onChange={this.orderDiff}/>
                  Descending
                </label>

                <label>
                  <input type="radio" value="Descending" checked={this.state.selectedOrder === "Descending"} onChange={this.orderDiff} />                  
                    Ascending
                </label>
            </form> 
        </div>

        <div>
              <ListView comics={this.state.comics} />
        </div>
      </div>
    );
  }
}

export default Search;
