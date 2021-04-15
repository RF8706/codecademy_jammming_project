import React from 'react';
import { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import NewPlaylist from '../NewPlaylist/NewPlaylist'
import UserPlaylists from '../UserPlaylists/UserPlaylists'

import Spotify from '../../util/Spotify'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      newPlaylistName: 'My playlist',
      newPlaylistTracks: [],
      userPlayList: []
    }

    // bind methods to "this" keyword
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.saveNewPlaylist = this.saveNewPlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  // CUSTOM METHODS
  addTrack(track) {
    let tracks = this.state.newPlaylistTracks
    if(tracks.find(addedTrack => addedTrack.id === track.id)) {
      return
    }
    tracks.push(track)
    this.setState({
      newPlaylistTracks: tracks
    })
  }

  removeTrack(track) {
    let tracks = this.state.newPlaylistTracks
    if(tracks.find(trackToRemove => trackToRemove.id === track.id)) {
      tracks.pop(track)
      this.setState({
        newPlaylistTracks: tracks
      })
    }
    return
  }

  updatePlaylistName(name) {
    this.setState({
      newPlaylistName: name
    })
  }

  saveNewPlaylist() {
    const trackURIs = this.state.newPlaylistTracks.map(track => track.uri)
    Spotify.saveNewPlaylist(this.state.newPlaylistName, trackURIs).then(() => {
      this.setState({
        newPlaylistName: 'New Playlist',
        newPlaylistTracks: []
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
              <NewPlaylist 
                playlistName={this.state.playlistName}
                newPlaylistTracks={this.state.newPlaylistTracks}
                onSave={this.saveNewPlaylist}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName} />
              <UserPlaylists />
            </div>
          </div>
        </div>
      );
    }
  }

export default App;
