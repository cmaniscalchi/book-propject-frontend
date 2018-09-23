import React from 'react'
import { connect } from 'react-redux'
import Book from './Book'
import { Grid } from 'semantic-ui-react'

const BookSearchList = props => {
  // console.log("BookSearchList props:", props)
  return (
    <Grid relaxed columns={4}>
      {props.searchResults.length > 0 ? props.searchResults.map(book => <Book book={book} key={book.id} />) : null}
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    searchResults: state.book.searchResults
  }
}

export default connect(mapStateToProps)(BookSearchList)
