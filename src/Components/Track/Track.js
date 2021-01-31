import React, { Component } from 'react'
import './Track.css'

class Track extends Component {
  constructor(props){
    super(props)
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.renderAction = this.renderAction.bind(this)
  }
  
  // CUSTOM METHODS
  // toggle +, - to add or remove tracks
  renderAction() {
    if(this.props.isRemoval) {
      return <button 
        className='Track-action'
        onClick={this.removeTrack}>-</button>
    } else {
      return <button 
        className='Track-action'
        onClick={this.addTrack}>+</button>
    }
  }
  // add track to playlist
  addTrack() {
    this.props.onAdd(this.props.track)
  }
  // remove track from playlist
  removeTrack() {
    this.props.onRemove(this.props.track)
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3> {this.props.track.name} </h3>
          <p> {this.props.track.artist} | {this.props.track.album} </p>
        </div>
          {this.renderAction()}
      </div>
    )
  }
}

export default Track