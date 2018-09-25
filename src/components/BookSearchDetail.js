import React from "react"
import { connect } from 'react-redux'
import { saveBook, deleteBook, viewEditions } from '../actions'
import { Container, Button } from 'semantic-ui-react'

const BookSearchDetail = ({ shelvedBooks, book, saveBook, userId }) => {
  console.log("BookSearchDetail:", shelvedBooks, book, userId)

  if (book) {
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
    shelvedBooks: state.book.shelvedBooks,
    userId: state.user.user.id
  }
}

export default connect(mapStateToProps, { saveBook, deleteBook, viewEditions })(BookSearchDetail)
