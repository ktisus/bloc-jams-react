import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData }; // assign albumData to the album property of the state object.
  }

  render() {
    return (
      <section className='library'>
        {
          this.state.albums.map( (album, index) =>

           <div className="album">
            <Link to={`/album/${album.slug}`} key={index}>
              <img src={album.albumCover} alt={album.title} />
               <div className='album-info'>
                <div>{album.title}</div>
                <div>{album.artist}</div>
                <div>{album.songs.length} songs</div>
              </div>
            </Link>
            </div>

        )
        }
      </section>
    );
  }
}

export default Library;
