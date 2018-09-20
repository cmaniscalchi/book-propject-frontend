import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchBook } from '../actions'
import { Container, Input, Button } from 'semantic-ui-react'

class SearchBar extends Component {
  state = { input: ''}

  handleInputChange = event => {
    this.setState({ input: event.target.value })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    if (this.state.input !== '') {
      this.props.searchBook(this.state.input)
      this.setState({ input: '' })
    }
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.handleFormSubmit}>
          <Input
            icon='book'
            iconPosition='left'
            value={this.state.input}
            style={{width:300}}
            onChange={this.handleInputChange}
          placeholder="Search for a book to add to your shelf" />
          <Button type="submit">Search</Button>
        </form>
      </Container>
    )
  }
}

export default connect(null, { searchBook })(SearchBar)
