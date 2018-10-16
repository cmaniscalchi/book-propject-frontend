import React, { Component } from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal, Rating } from 'semantic-ui-react'
import { setShelvedBooks, saveUserBook, searchAuthorBooks, clearSelectedBook, createDefaultBookshelf, setDefaultBookshelf, viewSimilarBooks } from '../actions'

class BookSearchDetail extends Component {

  componentDidMount() {
    let { user, currentBookshelf, setShelvedBooks, shelvedBooks, createDefaultBookshelf, setDefaultBookshelf } = this.props
    if (user.bookshelves.length === 0) {
      createDefaultBookshelf(user.id)
    } else if (!currentBookshelf) {
      setDefaultBookshelf()
    } else if (shelvedBooks.length === 0) {
      setShelvedBooks(shelvedBooks)
    } else {
      return null
    }
  }

  handleAuthorBookSearch = authorId => {
    let { searchAuthorBooks, clearSelectedBook } = this.props
    searchAuthorBooks(authorId)
    clearSelectedBook()
  }

  handleBookSave = (book, currentBookshelf) => {
    let { saveUserBook, clearSelectedBook } = this.props
    saveUserBook(book, currentBookshelf.id)
    clearSelectedBook()
  }

  handleViewSimilarBooks = book => {
    let { viewSimilarBooks, clearSelectedBook } = this.props
    viewSimilarBooks(book)
    clearSelectedBook()
  }

  render() {
    console.log("BookSearchDetail:", this.props)
    if (this.props.book && this.props.details) {

      let { book, details, modalOpen, shelvedBooks, clearSelectedBook, currentBookshelf } = this.props
      let striptags = require('striptags')

      return (
        <div>
          <Modal size='large' open={modalOpen} onClose={clearSelectedBook} closeIcon >
            <Modal.Header className='modal'>Explore Books To Shelve</Modal.Header>
            <Modal.Content image>
              <Image size='medium' style={{minWidth:'255px', minHeight:'191px', maxWidth:'255px', maxHeight:'389px'}} src={book.image_url} />
              <Modal.Description>
                <Header as='h3'>{book.title} by {book.author}</Header>
                { book.publication_year && details.publication_year ? <Header sub>Original Publication Year: { book.publication_year}<br />Edition Year: {details.publication_year}</Header> : <Header sub>Original Publication Year: {details.publication_year}</Header> }
                <br />
                <p>{striptags(details.description)}</p>
                <h5>Average Goodreads User Rating (out of {details.work.ratings_count.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )})</h5>
                <Rating defaultRating={Math.round(details.average_rating)} maxRating={5} disabled />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => this.handleAuthorBookSearch(book.goodreads_author_id)}>Other Works by {book.author}</Button>
              { details.similar_books ? <Button onClick={() => this.handleViewSimilarBooks(details)}>View Similar Books</Button> : null }
              <a href={ details.link } target='_blank'><Button>View Book on Goodreads</Button></a>
              { shelvedBooks.some(shelvedBook => shelvedBook.goodreads_book_id === book.goodreads_book_id) ? null : <Button onClick={() => this.handleBookSave(book, currentBookshelf)}>Save Book to Bookshelf</Button> }
            </Modal.Actions>
          </Modal>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => ({
  book: state.book.selectedBook,
  details: state.book.selectedBookDetails,
  modalOpen: state.book.modalOpen,
  shelvedBooks: state.user.user.books,
  currentBookshelf: state.user.user.currentBookshelf,
  user: state.user.user,
})

export default connect(mapStateToProps, { setShelvedBooks, saveUserBook, clearSelectedBook, createDefaultBookshelf, searchAuthorBooks, viewSimilarBooks, setDefaultBookshelf })(BookSearchDetail)
