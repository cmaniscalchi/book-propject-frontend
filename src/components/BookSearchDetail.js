import React, { Component } from "react"
import { connect } from 'react-redux'
import { saveBook, deleteBook, viewEditions } from '../actions'
import { Container, Button } from 'semantic-ui-react'
import { setShelvedBooks } from '../actions'

class BookSearchDetail extends Component {

  componentDidMount() {
    let { shelvedBooks, setShelvedBooks } = this.props
    console.log(shelvedBooks)
    setShelvedBooks(shelvedBooks)
  }

  render() {
    let { book, userId, saveBook, shelvedBooks } = this.props
    // console.log("BookSearchDetail:", shelvedBooks, book, userId)

    if (book) {
      debugger
      return (
        <Container>
          <h1>{book.title} by {book.author}</h1>
          {shelvedBooks.some(shelvedBook => shelvedBook.goodreads_book_id === book.goodreads_book_id) ? <em>This book is already on your bookshelf</em> : <Button onClick={() => saveBook(book, userId)}>Save Book to Bookshelf</Button>}
        </Container>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    book: state.book.selectedBook,
    shelvedBooks: state.user.user.books,
    userId: state.user.user.id
  }
}

export default connect(mapStateToProps, { setShelvedBooks, saveBook })(BookSearchDetail)
