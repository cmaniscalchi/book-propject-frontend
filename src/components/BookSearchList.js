import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookSearchBook from './BookSearchBook'
import { Grid, Message } from 'semantic-ui-react'
import { clearSearchResults } from '../actions'

class BookSearchList extends Component {

  componentDidMount() {
    this.props.clearSearchResults()
  }

  multiSearchResults = () => {
    let { searchResults } = this.props
    return (
      <div>
        <br />
        <Grid relaxed columns={4}>
          {searchResults.map(book => <BookSearchBook book={book} key={book.id} />)}
        </Grid>
      </div>
    )
  }

  singleSearchResult = () => {
    let { searchResults } = this.props
    return (
      <div>
        <br />
        <Message size='small' floating content="You'll have the ability to change your book covers once you've added a book to your shelf." />
        <br />
        <Grid relaxed columns={4}>
          <BookSearchBook book={searchResults[0]} key={searchResults[0].id} />)
        </Grid>
      </div>
    )
  }

  render() {
    return this.props.searchResults ? (
      <div>
        {this.props.searchResults.length > 1 ? this.multiSearchResults() : null}
        {this.props.searchResults.length === 1 ? this.singleSearchResult() : null}
      </div>
    ) : null
  }
}

const mapStateToProps = state => ({ searchResults: state.book.searchResults })

export default connect(mapStateToProps, { clearSearchResults })(BookSearchList)
