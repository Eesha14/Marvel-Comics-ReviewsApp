import React, { Component } from 'react';
import {Segment} from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom';
import 'normalize.css';
import axios from 'axios';
import './Detail.css';
import CommonNavigation from '../CommonNavigation/CommonNavigation';

function passParameters(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          comics: {},
          id: this.props.params.id,
          path:" ",
          ex:" ",
          url:' ',
          change: this.props.params,
          description:'',
          error:false,
          price: '',
          title:" ",
        };


        // id:this.props.match.params.id,
        // change:this.props.match.params.id,

        this.public_key = 'fc139ed47676ee20403f196c53afd4eb';
        var priv_key = '63253bdcac2c67cde035f289576f6133045f1593';
        this.ts = Date.now();
        var message = `${this.ts}${priv_key}${this.public_key}`;
        var hashing = require('md5');
        this.hash = hashing(message);

        this.baseUrl = 'https://gateway.marvel.com:443/v1/public/comics/';
        var url = `${this.baseUrl}${this.state.id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;

        this.goNext = this.goNext.bind(this);
        this.goPrev = this.goPrev.bind(this);
        axios.get(url).then((response) => {
            console.log(response);
            var url = `${this.state.path}.${this.state.ex}`;
            this.setState({comics:response.data.data.results[0]});
            console.log({comics:response.data.data.results[0]});
            this.setState({path:response.data.data.results[0].thumbnail.path});
            this.setState({
                ex:response.data.data.results[0].thumbnail.extension,
                description: response.data.data.results[0].description,
                price:response.data.data.results[0].prices[0].price,
                title:response.data.data.results[0].title,
                url:url
            });
        }).catch((e) => {
            console.log(e);
            this.setState({error:true});
        });
        
    }

    goNext() {
        var comic_id = String(Number(this.state.id)+1);
        this.setState({
            id:comic_id,
            error: false
        });
        var url = `${this.baseUrl}${comic_id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;
        axios.get(url).then((response) => {
            console.log(response.data.data.results[0]);
            var url = `${this.state.path}.${this.state.ex}`;
            console.log(url);
            this.setState({comics:response.data.data.results[0]});
            this.setState({path:response.data.data.results[0].thumbnail.path});
            console.log("Check the thumbnail extension"+{path:response.data.data.results[0].thumbnail.path});
            this.setState({
                ex:response.data.data.results[0].thumbnail.extension,
                description: response.data.data.results[0].description,
                price:response.data.data.results[0].prices[0].price,
                title:response.data.data.results[0].title,
                url:url, 
                change:this.state.id,
            });
            console.log(url);

        }).catch((exception) => {
            console.log("invalid id");
            console.log(exception);
            this.setState({error:true});
        });

    }

    goPrev() {
        console.log("button click");
        var comic_id = String(Number(this.state.id)-1);
        this.setState({id:comic_id,error: false});
        var url = `${this.baseUrl}${comic_id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;
        axios.get(url).then((response) => {
            console.log(response.data.data.results[0]);
            this.setState({comics:response.data.data.results[0]});
            this.setState({path:response.data.data.results[0].thumbnail.path});
            this.setState({
                ex:response.data.data.results[0].thumbnail.extension,
                description: response.data.data.results[0].description,
                price:response.data.data.results[0].prices[0].price,
                title:response.data.data.results[0].title,
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
        var previous_comic_id = String(Number(this.state.id)-1);
        var next_comic_id = String(Number(this.state.id)+1);
        if (this.state.error === true){
            return (
                <div>
                    <CommonNavigation/>
                    <Segment className="comiccard">
                        <div>Title: {this.state.title}</div>
                        <Link to={'/char/'+ previous_comic_id} onClick={this.goPrev}><span className="previous_button" id="prev_button">&#8592;</span></Link>
                        <Link to={'/char/'+ next_comic_id} onClick={this.goNext}><span className="next_button" id="next_button">&#8594;</span></Link>
                        <h1>M.O.D.O.K</h1>
                        {this.state.description ?
                        (<p><b>Description:</b> {this.state.description}</p> ): (<p> <b>Description:</b> We saw introductory films for heroes such as Thor, The Hulk and Captain America, learning about how they all tied into the Avengers Initiative — a plan by Nick Fury’s SHIELD agency to fight off big threats.
                                                When aliens invade Earth in search for the Tesseract — which is in the hands of the mischievous Loki — Iron Man, Hulk, Black Widow and other heroes form a team known as the Avengers, who work together to stop an invading alien army.</p>)}
                        {this.state.price ?
                        (<p><b>Price:</b> {this.state.price}</p> ): (<p><b>Price:</b>3.55</p>)}
                    </Segment>
                </div>
            );

        }
        else if (this.state.id === this.state.change){
            return (
                <div>
                    <CommonNavigation/>
                    <Segment className="comiccard">
                        <div>Title: {this.state.title}</div>
                        <Link to={'/char/'+ previous_comic_id} onClick={this.goPrev}><span className="previous_button" id="prev_button">&#8592;</span></Link>
                        <Link to={'/char/'+ next_comic_id} onClick={this.goNext}><span className="next_button" id="next_button">&#8594;</span></Link>
                        <h1>{this.state.comics.name}</h1>
                        {this.state.description ?
                        (<p><b>Description:</b> {this.state.description}</p> ): (<p> <b>Description:</b> We saw introductory films for heroes such as Thor, The Hulk and Captain America, learning about how they all tied into the Avengers Initiative — a plan by Nick Fury’s SHIELD agency to fight off big threats.
                                                When aliens invade Earth in search for the Tesseract — which is in the hands of the mischievous Loki — Iron Man, Hulk, Black Widow and other heroes form a team known as the Avengers, who work together to stop an invading alien army.</p>)}
                        {this.state.price ?
                        (<p><b>Price:</b> {this.state.price}</p> ): (<p><b>Price:</b>3.55</p>)}
                    </Segment>
                    
                </div>
            );
        }
        else{
            return (
            <div>
                    <CommonNavigation/>
                    <Segment className="comiccard">
                        <div>Title: {this.state.title}</div>
                        <Link to={'/char/'+ previous_comic_id} onClick={this.goPrev}><span className="previous_button" id="prev_button">&#8592;</span></Link>
                        <Link to={'/char/'+ next_comic_id} onClick={this.goNext}><span className="next_button" id="next_button">&#8594;</span></Link>
                        <h1>{this.state.comics.name}</h1>
                        {this.state.description ?
                        (<p><b>Description:</b> {this.state.description}</p> ): (<p><b>Description:</b> We saw introductory films for heroes such as Thor, The Hulk and Captain America, learning about how they all tied into the Avengers Initiative — a plan by Nick Fury’s SHIELD agency to fight off big threats.
                                                          When aliens invade Earth in search for the Tesseract — which is in the hands of the mischievous Loki — Iron Man, Hulk, Black Widow and other heroes form a team known as the Avengers, who work together to stop an invading alien army.</p>)}
                        {this.state.price ?
                        (<p><b>Price:</b> {this.state.price}</p> ): (<p><b>Price:</b>3.55</p>)}
                    </Segment>
                    
                </div>
            );

        }
        
    }
}


export default passParameters(Detail);
