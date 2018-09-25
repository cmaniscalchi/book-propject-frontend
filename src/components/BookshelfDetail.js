import React from "react"
import { connect } from 'react-redux'
import { saveBook, deleteBook, viewEditions } from '../actions'
import { Container, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const BookshelfDetail = ({ book, deleteBook, viewEditions, userId, location: { pathname } }) => {
  // console.log("BookshelfDetail:", book, userId, pathname)

  if (book && pathname === "/bookshelf") {
    return (
      <Container>
        <h1>{book.title} by {book.author}</h1>
        <Button onClick={() => viewEditions(book)}>View Alternate Editions</Button>
        <Button onClick={() => deleteBook(book.id)}>Remove Book from Shelf</Button>
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

export default withRouter(connect(mapStateToProps, { deleteBook, viewEditions })(BookshelfDetail))
