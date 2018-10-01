import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookSearchBook from './BookSearchBook'
import { Grid } from 'semantic-ui-react'
import { clearSearchResults } from '../actions'

class BookSearchList extends Component {

  componentDidMount() {
    this.props.clearSearchResults()
  }
  render() {
    if (this.props.searchResults) {
      let { searchResults } = this.props
      if (searchResults.length > 1) {
        return (
          <Grid relaxed columns={4}>
            {searchResults.map(book => <BookSearchBook book={book} key={book.id} />)}
          </Grid>
        )
      } else if (searchResults.length === 1) {
        return (
          <Grid relaxed columns={4}>
            <BookSearchBook book={searchResults[0]} key={searchResults[0].id} />)
          </Grid>
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

export default connect(mapStateToProps, { clearSearchResults })(BookSearchList)
