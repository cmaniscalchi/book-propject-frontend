import React from 'react'
import { connect } from 'react-redux'
import Book from './Book'

const BookSearchList = props => {
  console.log("BookSearchList props:", props)
  return (
    <div>
      {props.searchResults.length > 0 ? props.searchResults.map(book => <Book book={book} key={book.title} />) : null}
    </div>
  )
}

const mapStateToProps = state => {
  console.log("BookSearchList state:", state)
  return {
    searchResults: state.book.searchResults
  }
}

export default connect(mapStateToProps)(BookSearchList)
