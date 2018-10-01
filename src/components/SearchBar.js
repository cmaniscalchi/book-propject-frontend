import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchBook } from '../actions'
import { Segment, Form, Button, Grid, Header, Image, Message } from 'semantic-ui-react'

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
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as='h2' textAlign='center'>Search for Books to Add to Your Shelf</Header>
          <Form size='large'>
            <Segment style={{ width:600 }}>
              <Form onSubmit={this.handleFormSubmit}>
                <Form.Input
                  icon='book'
                  iconPosition='left'
                  value={this.state.input}
                  onChange={this.handleInputChange}
                  placeholder="Search by Title or Author"
                />
                <Button type="submit">Search</Button>
              </Form>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(null, { searchBook })(SearchBar)
