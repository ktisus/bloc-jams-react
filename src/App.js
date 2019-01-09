import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'; //import Route and Link
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album   from './components/Album';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        <ul>
          <nav className='head'>
            <Link to='/'><img src="./../assets/images/bloc_jams_logo.png" alt="Bloc Jams Landing" /></Link>
            <Link to='/library'>Collections</Link>
          </nav>
        </ul>
          <h1>Bloc Jams </h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;

// a slug is text that's been formatted to be acceptable in a different format. In this case, the slug will be a version of the album title that's formatted to work well in a URL. It will also serve as a unique id (identifier) for each album.
