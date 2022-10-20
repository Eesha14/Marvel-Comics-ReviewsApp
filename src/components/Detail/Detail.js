import React, { Component } from 'react';
import {Button, List, Image, Input,  Container, Segment, Label} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {useParams, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'normalize.css';
import axios from 'axios'
import PropTypes from 'prop-types';
import styles from './Detail.scss';
import { Redirect } from 'react-router'
import { withRouter } from 'react-router'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          characters: {},
          id: this.props.params.id,
          path:" ",
          ex:" ",
          url:' ',
          change: this.props.params,
          description:'',
          error:false,
          stories:[]
        };


        // id:this.props.match.params.id,
        // change:this.props.match.params.id,

        this.public_key = '7bb9513956ffbcaa3d45247e3f430d59';
        var private_key = '5e4ab8d3c6a10af00ce146e95feaf4d384272cc8';
        this.ts = Date.now();
        var msg = `${this.ts}${private_key}${this.public_key}`;
        var md5 = require('md5');
        this.hash = md5(msg);

        this.baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';
        var url = `${this.baseUrl}${this.state.id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;

        this.nextHandler = this.nextHandler.bind(this);
        this.prevHandler = this.prevHandler.bind(this);
          
        // GET some data back!
        axios.get(url).then((response) => {
            console.log(this.state.id);
            this.setState({characters:response.data.data.results[0]});
            this.setState({path:response.data.data.results[0].thumbnail.path});
            this.setState({
                ex:response.data.data.results[0].thumbnail.extension,
                description: response.data.data.results[0].description,
                stories:response.data.data.results[0].stories.items,
            });
            var url = `${this.state.path}.${this.state.ex}`;
            this.setState({url:url});
            console.log(url);
        }).catch((error) => {
            console.log(error);
            console.log("invalid id");
            var new_id = String(Number(this.state.id)+1);
            this.setState({error:true});

            // this.props.router.push(/char/+new_id);
            // this.nextHandler();


        });
        
    }

    nextHandler() {
        console.log("next");
        var new_id = String(Number(this.state.id)+1);
        this.setState({
            id:new_id,
            error: false
        });
        var url = `${this.baseUrl}${new_id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;

        // GET some data back!
        axios.get(url).then((response) => {
            console.log(response.data.data.results[0]);
            this.setState({characters:response.data.data.results[0]});
            this.setState({path:response.data.data.results[0].thumbnail.path});
            this.setState({
                ex:response.data.data.results[0].thumbnail.extension,
                description: response.data.data.results[0].description
            });
            var url = `${this.state.path}.${this.state.ex}`;
            console.log(url);
            this.setState({url:url, change:this.state.id});

        }).catch((error) => {
            console.log("invalid id");
            console.log(error);
            this.setState({error:true});
        });

    }

    prevHandler() {
        console.log("prev clicked");

        var new_id = String(Number(this.state.id)-1);
        this.setState({
            id:new_id,
            error: false

        });
        var url = `${this.baseUrl}${new_id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;

        // GET some data back!
        axios.get(url).then((response) => {
            console.log(response.data.data.results[0]);
            this.setState({characters:response.data.data.results[0]});
            this.setState({path:response.data.data.results[0].thumbnail.path});
            this.setState({
                ex:response.data.data.results[0].thumbnail.extension,
                description: response.data.data.results[0].description
            });
            var url = `${this.state.path}.${this.state.ex}`;
            this.setState({url:url, change:this.state.id});

            console.log(url);

        }).catch((error) => {
            console.log("invalid id");
            console.log(error);
            this.setState({error:true});
        });
    }

    render() {
        var prev_id = String(Number(this.state.id)-1);
        var next_id = String(Number(this.state.id)+1);
        var cur_id = this.state.id;
        console.log("render  "+this.state.id);
        const abilitiesView = this.state.stories.map((story, idx) => {
        return (
          <Label key={idx} className="label">
            {story.name}
          </Label>
        )
      });
        if (this.state.error === true){
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
                    <Segment className="char-card">
                        <Link to={'/char/'+ prev_id} onClick={this.prevHandler}><span className="prev" id="prev">&#10094;</span></Link>
                        <Link to={'/char/'+ next_id} onClick={this.nextHandler}><span className="next" id="next">&#10095;</span></Link>
                        <h1>Invalid character ID, please click next or prev.</h1>
                    </Segment>
                    
                </div>
            );

        }
        else if (this.state.id === this.state.change){
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
                    <Segment className="char-card">
                        
                        <Link to={'/char/'+ prev_id} onClick={this.prevHandler}><span className="prev" id="prev">&#10094;</span></Link>
                        <Link to={'/char/'+ next_id} onClick={this.nextHandler}><span className="next" id="next">&#10095;</span></Link>
                        <h1>{this.state.characters.name}</h1>
                        <Label  className="label">
                            ID: {this.state.id}
                        </Label>
                        {this.state.description ?
                        (<p><b>Description:</b> {this.state.description}</p> ): (<p></p>)}
                        <div>Stories: {abilitiesView}</div>
                    </Segment>
                    
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
                    <Segment className="char-card">
                        <Link to={'/char/'+ prev_id} onClick={this.prevHandler}><span className="prev" id="prev">&#10094;</span></Link>
                        <Link to={'/char/'+ next_id} onClick={this.nextHandler}><span className="next" id="next">&#10095;</span></Link>
                        <h1>{this.state.characters.name}</h1>
                        <Label  className="label">
                            ID: {this.state.id}
                        </Label>
                        {this.state.description ?
                        (<p><b>Description:</b> {this.state.description}</p> ): (<p></p>)}
                        <div>Stories: {abilitiesView}</div>
                    </Segment>
                    
                </div>
            );

        }
        
    }
}


export default withParams(Detail);
