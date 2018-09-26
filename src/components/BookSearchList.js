import React, { Component } from 'react'
import { connect } from 'react-redux'
import Book from './Book'
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
        {searchResults.length > 0 ? searchResults.map(book => <Book book={book} key={book.id} />) : null}
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
