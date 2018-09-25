import React from "react"
import { connect } from 'react-redux'
import { saveBook, deleteBook, viewEditions } from '../actions'
import { Container, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const BookDetail = ({ book, saveBook, userId, location: { pathname } }) => {
  console.log("BookDetail:", book, userId, pathname)

  if (book) {
    return (
      <Container>
        <h1>{book.title ? book.title : book.best_book.title}</h1>
        <Button onClick={() => saveBook(book, userId)}>Save Book to Bookshelf</Button>
      </Container>
    )
  } else {
  return null
  }
}

function mapStateToProps(state) {
  return {
    book: state.book.selectedBook,
    userId: state.user.user.id
  }
}

export default withRouter(connect(mapStateToProps, { saveBook, deleteBook, viewEditions })(BookDetail))
