import React from "react"
import { connect } from 'react-redux'
import { saveBook, deleteBook, viewEditions } from '../actions'
import { Container, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const BookshelfDetail = ({ book, saveBook, userId, location: { pathname } }) => {
  console.log("BookshelfDetail:", book, userId, pathname)

  if (book && pathname === "/bookshelf") {
    return (
      <Container>
        <h1>{book.title} by {book.author}</h1>
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

export default withRouter(connect(mapStateToProps, { saveBook, deleteBook, viewEditions })(BookshelfDetail))
