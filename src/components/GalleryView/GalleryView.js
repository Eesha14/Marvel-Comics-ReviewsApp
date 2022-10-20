import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, Card} from 'semantic-ui-react'
import Grid from '@mui/material/Grid';
import styles from './GalleryView.scss'
import { Link } from 'react-router-dom';


class GalleryView extends Component {
  render() {
    const noCharacter = Object.entries(this.props.characters).length === 0
      && this.props.characters.constructor === Object;

    if (noCharacter) {
      return (
        <Card className="noCharacter">
          <h3>Keep Looking for characters...!</h3>
        </Card>
      )
    } else {
      const characters_view = this.props.characters.results.map((character_data,idx)=>{
          var url = `${character_data.thumbnail.path}.${character_data.thumbnail.extension}`;
          var date = character_data.modified.substring(0,10);
          var id = character_data.id;
          var char = `/char/${id}`;
          return(
              <Grid key={idx} xs={6}>
               <Link to={char}>
                <div>
                  <Card className="noCharacter">
                    <Image src={url} className='imgSize'/>
                  </Card>
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
