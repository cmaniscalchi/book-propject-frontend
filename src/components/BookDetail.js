import React from "react"
import { connect } from 'react-redux'
import { saveBook } from '../actions'
import { Container, Button } from 'semantic-ui-react'

const BookDetail = ({ book, saveBook, userId }) => {
  console.log("BookDetail:", book, userId)

  if (book && userId) {
    return (
      <Container>
        <h1>{book.best_book.title}</h1>
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

export default connect(mapStateToProps, { saveBook })(BookDetail)
