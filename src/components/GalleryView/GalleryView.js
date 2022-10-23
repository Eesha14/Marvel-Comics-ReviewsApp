import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image} from 'semantic-ui-react'
import Grid from '@mui/material/Grid';
import './GalleryView.css'
import { Link } from 'react-router-dom';


class GalleryView extends Component {
  render() {
    const none_char = Object.entries(this.props.comics).length === 0
      && this.props.comics.constructor === Object;

    if (none_char) {
      return (
          <h3>Keep Looking for Characters...!</h3>
      )
    } else {
      const characters_view = this.props.comics.results.map((character_data,idx)=>{
        // console.log("g");
        // console.log(this.props.comics.results);
          var url = `${character_data.thumbnail.path}.${character_data.thumbnail.extension}`;
          var id = character_data.id;
          var char = `/gallerychar/${id}`;
          return(
              <Grid key={idx} xs={6}>
               <Link to={char}>
                <div>
                    <Image src={url} className='imageSize'/>
                </div>
                </Link>   
              </Grid>
            )
        });
      return (
          <Grid container spacing={1}>
            {characters_view}
          </Grid>
      )
    }
  }
}

GalleryView.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
      id:PropTypes.number,
      name:PropTypes.string,
      modified:PropTypes.string,
      thumbnail:PropTypes.shape({
        path:PropTypes.string,
        extension: PropTypes.string
      })
    })),
}
export default GalleryView
