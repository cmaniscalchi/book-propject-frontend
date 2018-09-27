import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookSearchBook from './BookSearchBook'
import { Grid } from 'semantic-ui-react'
import { clearSearchResults } from '../actions'

class BookSearchList extends Component {

  componentDidMount() {
    this.props.clearSearchResults()
  }
  // console.log("BookSearchList props:", props)
  render() {
    let { searchResults } = this.props

    return (
      <Grid relaxed columns={4}>
        {searchResults.length > 0 ? searchResults.map(book => <BookSearchBook book={book} key={book.id} />) : null}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.book.searchResults
  }
}

export default connect(mapStateToProps, { clearSearchResults })(BookSearchList)
