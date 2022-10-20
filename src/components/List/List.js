import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Label, List, Image } from 'semantic-ui-react'
import styles from './List.scss'
import { Link } from 'react-router-dom';


class ListView extends Component {
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
      console.log(Object.entries(this.props.characters).length);
      const characters_view = this.props.characters.results.map((character_data,idx)=>{
          console.log(idx);
          var url = `${character_data.thumbnail.path}.${character_data.thumbnail.extension}`;
          var date = character_data.modified.substring(0,10);
          var id = String(character_data.id);
          var char = `/char/${id}`;
          return(
              <li className="w3-bar" key={idx}>
                  <Link to={char} className="listrow">
                    <div className="bar-contnet">
                    <div className="avatar">
                      <Image src={url} avatar />
                      <span className='character_name'>{character_data.name}</span>
                    </div>
                      <div className='modified'>Changed: {date}</div>
                  </div>
                  </Link>
              </li>
            )
        });
      return (
          <ul className="w3-ul w3-card-4">
            {characters_view}
          </ul>
        
      )
    }
  }
}

ListView.propTypes = {
  count: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.shape({
      id:PropTypes.number,
      name:PropTypes.string,
      modified:PropTypes.string,
      thumbnail:PropTypes.shape({
        path:PropTypes.string,
        extension: PropTypes.string
      })
    })),
  total: PropTypes.number,
}
export default ListView
