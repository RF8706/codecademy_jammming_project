import React, { Component } from 'react'
import './SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: ''
    }
    this.search = this.search.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  search(event) {
    event.preventDefault()
    this.props.onSearch(this.state.term)
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.search()
  }


  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist..." />
          <button onClick={this.search} className="SearchButton">SEARCH</button>
        </form>
      </div>
    )
  }
}

export default SearchBar

