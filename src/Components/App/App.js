import React from 'react';
import { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'

import Spotify from '../../util/Spotify'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'My playlist',
      playlistTracks: []
    }

    // bind methods to "this" keyword
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  // CUSTOM METHODS
  addTrack(track) {
    let tracks = this.state.playlistTracks
    if(tracks.find(addedTrack => addedTrack.id === track.id)) {
      return
    }
    tracks.push(track)
    this.setState({
      playlistTracks: tracks
    })
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks
    if(tracks.find(trackToRemove => trackToRemove.id === track.id)) {
      tracks.pop(track)
      this.setState({
        playlistTracks: tracks
      })
    }
    return
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  // RENDER METHOD
  render() {
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <h2>Search songs and create custom playlists to save to your Spotify account.</h2>
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults 
                searchResults={this.state.searchResults}
                onAdd={this.addTrack} />
              <Playlist 
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onSave={this.savePlaylist}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName} />
            </div>
          </div>
        </div>
      );
    }
  }

export default App;
