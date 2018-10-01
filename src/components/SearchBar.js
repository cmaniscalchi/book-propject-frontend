import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchBook } from '../actions'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'

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
          <br />
          <Form size='large' onSubmit={this.handleFormSubmit}>
            <Segment style={{ width:600 }}>
              <Form.Input
                icon='book'
                iconPosition='left'
                value={this.state.input}
                onChange={this.handleInputChange}
                placeholder="Search by Title or Author"
              />
              <Button type="submit">Search</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(null, { searchBook })(SearchBar)
