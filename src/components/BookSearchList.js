import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookSearchBook from './BookSearchBook'
import { Grid, Message } from 'semantic-ui-react'
import { clearSearchResults, authenticatingUser } from '../actions'

class BookSearchList extends Component {

  componentDidMount() {
    this.props.clearSearchResults()
  }
  render() {
    if (this.props.searchResults) {
      let { searchResults, authenticatingUser } = this.props
      if (searchResults.length > 1) {
        return (
          <div>
            <br />
            <Grid loading={authenticatingUser} relaxed columns={4}>
              {searchResults.map(book => <BookSearchBook book={book} key={book.id} />)}
            </Grid>
          </div>
        )
      } else if (searchResults.length === 1) {
        return (
          <div>
            <br />
            <Message size='small' floating floated='left' content="You'll have the ability to change your book covers once you've added a book to your shelf." />
            <br />
            <Grid loading={authenticatingUser} relaxed columns={4}>
              <BookSearchBook book={searchResults[0]} key={searchResults[0].id} />)
            </Grid>
          </div>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }
}

const mapStateToProps = state => ({ searchResults: state.book.searchResults })

export default connect(mapStateToProps, { clearSearchResults, authenticatingUser })(BookSearchList)
