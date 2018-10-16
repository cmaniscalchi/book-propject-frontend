import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchBook } from '../actions'
import { Segment, Form, Button, Grid, Header, Icon, Image } from 'semantic-ui-react'

class BookSearchBar extends Component {
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
    const searchImage = require('../assets/img/Winslow-Homer.jpg')
    let { searchResults, shelvedBooks } = this.props

    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 800 }}>
          <Form size='large' onSubmit={this.handleFormSubmit}>
            <Segment style={{ width:800 }}>
              { shelvedBooks.length === 0 ? (
                <div>
                  <Header as='h2' textAlign='center'>Welcome to Ex Libris, your virtual bookshelf!</Header>
                  <Header sub textAlign='center'> Begin by exploring books to add to your shelf.</Header>
                </div>
              ) : (
                <div>
                  <Header as='h2' textAlign='center'>Search for Books to Add to Your Shelf</Header>
                  <Header sub textAlign='center'>You'll have the ability to change a book's cover once it's been saved to your bookshelf.</Header>
                </div>
              ) }
              <br />
              <Form.Input
                icon='book'
                iconPosition='left'
                value={this.state.input}
                onChange={this.handleInputChange}
                placeholder="Search by Title or Author"
              />
              { searchResults.length > 0 ? null : <Image src={searchImage} alt='Ex Libris' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '90%' }}/> }
              <br />
              <Button icon type="submit"><Icon name='search' />  Search</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  searchResults: state.book.searchResults,
  shelvedBooks: state.user.user.books
})

export default connect(mapStateToProps, { searchBook })(BookSearchBar)
