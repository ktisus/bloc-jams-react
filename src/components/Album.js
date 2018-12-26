import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      currentVolume: 0.5
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ currentVolume: this.audioElement.currentVolume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);

  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleMouseEnter (index) {
    this.setState({
      isHovering: index,
    });
  }

  handleMouseLeave(song) {
    this.setState({
      isHovering: false,
    })
  }

  handleIcon(song, index) {
    if (this.state.isPlaying && this.state.currentSong === song) {
      return (<span className="ion-pause"></span>);
    } else if (this.state.isHovering !== song) {
      return (<td>{index + 1}</td>);
    } else if (this.state.isHovering === song && this.state.currentSong !== song) {
      return (<span className="ion-play"></span>);
    } // else if (this.state.isPlaying === true && this.state.isHovering === song) {
    //  return (<span className="ion-pause"></span>);
  //  };
    return (<span className="ion-play"></span>);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState ({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    /* set the new volume */
    this.audioElement.currentVolume = newVolume;
    this.setState({ currentVolume: newVolume});
  }

  formatTime(time) {
    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time - minutes * 60);
    if (seconds < 10) {
      return minutes + ':0' + seconds;
    } else if (seconds >= 10) {
      return minutes + ':' + seconds;
    } else {
      return "-:--"
    }
  }

   render() {
     return (
       <section className="album">
         <section id="album-info">
            <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
            <div className="album-details">
              <h1 id="album-title">{this.state.album.title}</h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
          </section>
          <table id="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody>
              {
                this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={() => this.handleSongClick(song)}
                  onMouseEnter={() => this.handleMouseEnter(song)}
                  onMouseLeave={() => this.handleMouseLeave(song)}>
                <td>{this.handleIcon(song, index) }</td>
                <td key="title">{song.title}</td>
                <td key="duration" >{this.formatTime(song.duration)} </td>
              </tr>
               )

              }

            </tbody>
          </table>
          <PlayerBar
            isPlaying={this.state.isPlaying}
            currentSong={this.state.currentSong}
            currentTime={this.audioElement.currentTime}
            duration={ this.audioElement.duration }
            currentVolume={ this.audioElement.currentVolume }
            formatTime={ (time) => this.formatTime(time)}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            handleTimeChange={(e) => this.handleTimeChange(e)}
            handleVolumeChange={(e) => this.handleVolumeChange(e)}
          />
       </section>
     );
   }
 }

export default Album;

// React Router makes URL parameters available by assigning them as properties of the this.props.match.params object
