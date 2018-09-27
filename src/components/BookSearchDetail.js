import React, { Component } from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { setShelvedBooks, saveUserBook, clearSelectedBook, createBookshelf } from '../actions'

class BookSearchDetail extends Component {

  componentDidMount() {
    let { user, setShelvedBooks, shelvedBooks, createBookshelf } = this.props
    if (user.bookshelves.length === 0) {createBookshelf(user.id)}
    setShelvedBooks(shelvedBooks)
  }

  handleBookSaveOnClick = (book, user) => {
    let { saveUserBook, clearSelectedBook } = this.props
    saveUserBook(book, user.bookshelves[0].id)
    clearSelectedBook()
  }

  render() {
    let { book, modalOpen, shelvedBooks, clearSelectedBook, user } = this.props
    console.log("BookSearchDetail:", book, user, modalOpen, shelvedBooks)

    if (book) {
      return (
        <div>
          <Modal open={modalOpen} onClose={clearSelectedBook}>
            <Modal.Header>Save A Book To Your Bookshelf</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src={book.image_url} />
              <Modal.Description>
                <Header>{book.title} by {book.author}</Header>
                <p>More deets to go here.</p>
                <p>Eventually.</p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              {shelvedBooks.some(shelvedBook => shelvedBook.goodreads_book_id === book.goodreads_book_id) ? null : <Button onClick={() => this.handleBookSaveOnClick(book, user)}>Save Book to Bookshelf</Button>}
            </Modal.Actions>
          </Modal>
        </div>
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
    user: state.user.user,
    modalOpen: state.book.modalOpen
  }
}

export default connect(mapStateToProps, { setShelvedBooks, saveUserBook, clearSelectedBook, createBookshelf })(BookSearchDetail)
