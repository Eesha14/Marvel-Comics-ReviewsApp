import React, { Component } from 'react';
import {Image, Segment} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import 'normalize.css';
import axios from 'axios';
import './Detail_Event.css';
import CommonNavigation from '../CommonNavigation/CommonNavigation';

function passParameters(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class Detail_Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
          comics: {},
          id: this.props.params.id,
          path:" ",
          ex:" ",
          url:' ',
          change: this.props.params,
          error:false,
          name:" ",
          modified: " ",
        };


        // id:this.props.match.params.id,
        // change:this.props.match.params.id,

        this.public_key = 'fc139ed47676ee20403f196c53afd4eb';
        var private_key = '63253bdcac2c67cde035f289576f6133045f1593';
        this.ts = Date.now();
        var message = `${this.ts}${private_key}${this.public_key}`;
        var hashing = require('md5');
        this.hash = hashing(message);

        this.baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';
        var url = `${this.baseUrl}${this.state.id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;

        this.goNext = this.goNext.bind(this);
        this.goPrev = this.goPrev.bind(this);
        axios.get(url).then((response) => {
            console.log(response);
            this.setState({comics:response.data.data.results[0]});
            this.setState({path:response.data.data.results[0].thumbnail.path});
            this.setState({
                ex:response.data.data.results[0].thumbnail.extension,
                name:response.data.data.results[0].name,
                modified:response.data.data.results[0].modified.substring(0,10),
            });
            var url = `${this.state.path}.${this.state.ex}`;
            this.setState({url:url});
            console.log(url);
        }).catch((exception) => {
            console.log(exception);
            this.setState({error:true});
        });
        
    }

    goNext() {
        var new_id = String(Number(this.state.id)+1);
        this.setState({
            id:new_id,
            error: false
        });
        var url = `${this.baseUrl}${new_id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;
        axios.get(url).then((response) => {
            console.log(response.data.data.results[0]);
            this.setState({comics:response.data.data.results[0]});
            this.setState({path:response.data.data.results[0].thumbnail.path});
            console.log("ggg");
            console.log(response.data.data.results[0].thumbnail.path);
            this.setState({
                ex:response.data.data.results[0].thumbnail.extension,
                name:response.data.data.results[0].name,
                modified:response.data.data.results[0].modified.substring(0,10),
            });
            var url = `${this.state.path}.${this.state.ex}`;
            console.log(url);
            this.setState({url:url, change:this.state.id});

        }).catch((exception) => {
            console.log("invalid id");
            console.log(exception);
            this.setState({error:true});
        });

    }

    goPrev() {

        var new_id = String(Number(this.state.id)-1);
        this.setState({
            id:new_id,
            error: false
        });
        var url = `${this.baseUrl}${new_id}?apikey=${this.public_key}&ts=${this.ts}&hash=${this.hash}`;
        axios.get(url).then((response) => {
            console.log(response.data.data.results[0]);
            this.setState({comics:response.data.data.results[0]});
            this.setState({path:response.data.data.results[0].thumbnail.path});
            this.setState({
                ex:response.data.data.results[0].thumbnail.extension,
                name:response.data.data.results[0].name,
                modified:response.data.data.results[0].modified.substring(0,10),
            });
            var url = `${this.state.path}.${this.state.ex}`;
            this.setState({url:url, change:this.state.id});

            console.log(url);

        }).catch((exception) => {
            console.log("invalid id");
            console.log(exception);
            this.setState({error:true});
        });
    }

    render() {
        var prev_id = String(Number(this.state.id)-1);
        var next_id = String(Number(this.state.id)+1);
        if (this.state.error === true){
            return (
                <div>
                    <CommonNavigation/>
                    <Segment className="char-card">
                        <Link to={'/gallerychar/'+ prev_id} onClick={this.goPrev}><span className="previous_button" id="prev_button">&#8592;</span></Link>
                        <Link to={'/gallerychar/'+ next_id} onClick={this.goNext}><span className="next_button" id="next_button">&#8594;</span></Link>
                        <h1>Opps! The comic you are looking for is unavailable.</h1>
                    </Segment>
                </div>
            );

        }
        else if (this.state.id === this.state.change){
            return (
                <div>
                    <CommonNavigation/>
                    <Segment className="char-card">
                        <div>Name: {this.state.name}</div>
                        <Image src={this.state.url} size='medium' centered className='bimg'/>
                        <div>Modified: {this.state.modified}</div>
                        <div>ID: {this.state.id}</div>
                        <Link to={'/gallerychar/'+ prev_id} onClick={this.goPrev}><span className="previous_button" id="prev_button">&#8592;</span></Link>
                        <Link to={'/gallerychar/'+ next_id} onClick={this.goNext}><span className="next_button" id="next_button">&#8594;</span></Link>
                    </Segment>
                    
                </div>
            );
        }
        else{
            return (
            <div>
                    <CommonNavigation/>
                    <Segment className="char-card">
                        <div>Name: {this.state.name}</div>
                        <Image src={this.state.url} size='medium' centered className='bimg'/>
                        <div>Modified: {this.state.modified}</div>
                        <div>ID: {this.state.id}</div>
                        <Link to={'/gallerychar/'+ prev_id} onClick={this.goPrev}><span className="previous_button" id="prev_button">&#8592;</span></Link>
                        <Link to={'/gallerychar/'+ next_id} onClick={this.goNext}><span className="next_button" id="next_button">&#8594;</span></Link>
                    </Segment>
                    
                </div>
            );

        }
        
    }
}


export default passParameters(Detail_Event);
