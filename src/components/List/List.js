import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Image } from 'semantic-ui-react'
import './List.css'
import { Link } from 'react-router-dom';


class ListView extends Component {
  render() {
    const no_Comics = Object.entries(this.props.comics).length === 0 && this.props.comics.constructor === Object;

    if (no_Comics) {
      return (
          <h2 className="no-Comic">Are you a comic freak??</h2>
      )
    } else {
      const comics = this.props.comics.results.map((comic_data,id_)=>{
          var url = `${comic_data.thumbnail.path}.${comic_data.thumbnail.extension}`;
          var char = `/char/${id_}`;
          var volume = comic_data.issueNumber;
          var id_ = String(comic_data.id);
          return(
              <li className="liview" key={id_}>
                  <Link to={char} className="listrow">
                    <div className="avatar">
                      <Image class="comicimage" src={url} avatar />
                      <span className='comic_name'>{comic_data.title}</span>
                    </div>
                      <div className='volume'>Volume Number: {volume}</div>
                  </Link>
              </li>
            )
        });
      return (
          <ul className="listlist">
            {comics}
          </ul>
        
      )
    }
  }
}

ListView.propTypes = {
  limit: PropTypes.number,
  offset: PropTypes.number,
  count: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.shape({
    id_:PropTypes.number,
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
