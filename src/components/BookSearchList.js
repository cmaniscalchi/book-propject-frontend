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
    console.log("BookSearchList props:", this.props)
    if (this.props.searchResults) {
      return (
        <Grid relaxed columns={4}>
          {this.props.searchResults.map(book => <BookSearchBook book={book} key={book.id} />)}
        </Grid>
      )
    } else {
      return null
    }
  }
}

  const mapStateToProps = state => ({ searchResults: state.book.searchResults })

  export default connect(mapStateToProps, { clearSearchResults })(BookSearchList)
