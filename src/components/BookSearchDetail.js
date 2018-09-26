import React, { Component } from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { setShelvedBooks, saveUserBook, clearSelectedBook } from '../actions'

class BookSearchDetail extends Component {

  componentDidMount() {
    let { setShelvedBooks, shelvedBooks } = this.props
    setShelvedBooks(shelvedBooks)
  }

  handleBookSaveOnClick = (book, userId) => {
    let { saveUserBook, clearSelectedBook } = this.props
    saveUserBook(book, userId)
    clearSelectedBook()
  }

  render() {
    let { book, userId, modalOpen, shelvedBooks, clearSelectedBook } = this.props
    // console.log("BookSearchDetail:", book, userId, modalOpen, shelvedBooks)

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
              {shelvedBooks.some(shelvedBook => shelvedBook.goodreads_book_id === book.goodreads_book_id) ? null : <Button onClick={() => this.handleBookSaveOnClick(book, userId)}>Save Book to Bookshelf</Button>}
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
    userId: state.user.user.id,
    modalOpen: state.book.modalOpen
  }
}

export default connect(mapStateToProps, { setShelvedBooks, saveUserBook, clearSelectedBook })(BookSearchDetail)
