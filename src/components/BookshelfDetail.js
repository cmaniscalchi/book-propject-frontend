import React from "react"
import { connect } from 'react-redux'
import { Container, Button } from 'semantic-ui-react'
import { deleteUserBook, viewEditions } from '../actions'

const BookshelfDetail = ({ book, deleteUserBook, viewEditions }) => {
  // console.log("BookshelfDetail:", book)

  if (book) {
    return (
      <Container>
        <h1>{book.title} by {book.author}</h1>
        <Button onClick={() => viewEditions(book)}>View Alternate Editions</Button>
        <Button onClick={() => deleteUserBook(book.id)}>Remove Book from Shelf</Button>
      </Container>
    )
  } else {
  return null
  }
}

function mapStateToProps(state) {
  return {
    book: state.book.selectedBook
  }
}

export default connect(mapStateToProps, { deleteUserBook, viewEditions })(BookshelfDetail)
