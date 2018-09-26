import React, { Component } from "react"
import { connect } from 'react-redux'
import { Container, Button } from 'semantic-ui-react'
import { setShelvedBooks, saveUserBook } from '../actions'

class BookSearchDetail extends Component {

  componentDidMount() {
    let { setShelvedBooks, shelvedBooks } = this.props
    setShelvedBooks(shelvedBooks)
  }

  render() {
    let { book, userId, saveUserBook, shelvedBooks } = this.props
    // console.log("BookSearchDetail:", shelvedBooks, book, userId)

    if (book) {
      return (
        <Container>
          <h1>{book.title} by {book.author}</h1>
          {shelvedBooks.some(shelvedBook => shelvedBook.goodreads_book_id === book.goodreads_book_id) ? null : <Button onClick={() => saveUserBook(book, userId, shelvedBooks)}>Save Book to Bookshelf</Button>}
        </Container>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return {
    book: state.book.selectedBook,
    shelvedBooks: state.user.user.books,
    userId: state.user.user.id
  }
}

export default connect(mapStateToProps, { setShelvedBooks, saveUserBook })(BookSearchDetail)
