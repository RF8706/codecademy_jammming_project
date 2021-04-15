import React, { Component } from 'react'
import './NewPlaylist.css'

import TrackList from '../TrackList/TrackList'

class Playlist extends Component {
constructor(props) {
  super(props)
  this.handleNameChange = this.handleNameChange.bind(this)
}
  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }

  render() {
    return (
      <div className="NewPlaylist">
        <input  onChange={this.handleNameChange} defaultValue={"New Playlist..."} placeholder='New Playlist Name...'/>
        <TrackList 
          tracks={this.props.newPlaylistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true} />
        <button onClick={this.props.onSave} className="NewPlaylist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

export default Playlist