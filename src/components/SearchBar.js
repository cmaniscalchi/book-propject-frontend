import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchBook } from '../actions'

class SearchBar extends Component {
  state = { input: ''}

  handleInputChange = event => {
    this.setState({ input: event.target.value })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    this.props.searchBook(this.state.input)
    this.setState({ input: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          value={this.state.input}
          style={{width:200}}
          onChange={this.handleInputChange}
          placeholder="Search for a book to add to your shelf" />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default connect(null, { searchBook })(SearchBar)
