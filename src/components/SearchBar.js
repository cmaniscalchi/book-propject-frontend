import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchBook } from '../actions'
import { Segment, Form, Button } from 'semantic-ui-react'

class SearchBar extends Component {
  state = { input: ''}

  handleInputChange = event => {
    this.setState({ input: event.target.value })
  }

  handleFormSubmit = event => {
    if (this.state.input !== '') {
      this.props.searchBook(this.state.input)
      this.setState({ input: '' })
    }
  }

  render() {
    return (
      <Segment style={{width:400}}>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Input
            icon='book'
            iconPosition='left'
            value={this.state.input}
            onChange={this.handleInputChange}
            placeholder="Search for a book to add to your shelf"
          />
          <Button type="submit">Search</Button>
        </Form>
      </Segment>
    )
  }
}

export default connect(null, { searchBook })(SearchBar)
