import React from "react"
import { connect } from 'react-redux'
import { saveBook, deleteBook, viewEditions } from '../actions'
import { Container, Button } from 'semantic-ui-react'

const BookshelfDetail = ({ book, deleteBook, viewEditions, userId }) => {
  // console.log("BookshelfDetail:", book, userId)

  if (book) {
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

export default connect(mapStateToProps, { deleteBook, viewEditions })(BookshelfDetail)
