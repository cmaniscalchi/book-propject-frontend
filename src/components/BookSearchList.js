import React from 'react'
import { connect } from 'react-redux'
import Book from './Book'

const BookSearchList = props => {
  // console.log("BookSearchList props:", props)
  return (
    <div>
      {props.searchResults.map(book => <Book book={book} key={book.title} />)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults
  }
}

export default connect(mapStateToProps)(BookSearchList)
