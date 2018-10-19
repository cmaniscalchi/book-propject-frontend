import React, { Component } from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal, Rating } from 'semantic-ui-react'
import { clearSelectedBook, createDefaultBookshelf, saveUserBook, searchAuthorBooks, setDefaultBookshelf, viewSimilarBooks } from '../../actions'

class BookSearchDetailModal extends Component {

  componentDidMount() {
    let { bookshelves, createDefaultBookshelf, currentBookshelf, id, setDefaultBookshelf } = this.props
    if (bookshelves.length === 0) {
      createDefaultBookshelf(id)
    } else if (!currentBookshelf) {
      setDefaultBookshelf()
    } else {
      return null
    }
  }

  handleAuthorBookSearch = authorId => {
    let { clearSelectedBook, searchAuthorBooks } = this.props
    searchAuthorBooks(authorId)
    clearSelectedBook()
  }

  handleBookSave = (book, currentBookshelf) => {
    let { clearSelectedBook, saveUserBook } = this.props
    saveUserBook(book, currentBookshelf.id)
    clearSelectedBook()
  }

  handleViewSimilarBooks = book => {
    let { clearSelectedBook, viewSimilarBooks } = this.props
    viewSimilarBooks(book)
    clearSelectedBook()
  }

  render() {
    // console.log("BookSearchDetailModal:", this.props)
    if (this.props.selectedBook && this.props.selectedBookDetails) {

      let { books, clearSelectedBook, currentBookshelf, modalOpen, selectedBook, selectedBookDetails } = this.props
      let { author, goodreads_author_id, goodreads_book_id, image_url, publication_year, title, } = selectedBook
      let { average_rating, description, link, similar_books, work } = selectedBookDetails
      let striptags = require('striptags')

      return (
        <div>
          <Modal size='large' open={modalOpen} onClose={clearSelectedBook} closeIcon >
            <Modal.Header className='modal'>Explore Books To Shelve</Modal.Header>
            <Modal.Content image>
              <Image size='medium' style={{minWidth:'255px', minHeight:'191px', maxWidth:'255px', maxHeight:'389px'}} src={image_url} />
              <Modal.Description>
                <Header as='h3'>{title} by {author}</Header>
                { publication_year && selectedBookDetails.publication_year && publication_year !== selectedBookDetails.publication_year ? <Header sub>Original Publication Year: {publication_year} <br /> Edition Year: {selectedBookDetails.publication_year}</Header> : <Header sub>Original Publication Year: {publication_year}</Header> }
                <br />
                <p>{striptags(description)}</p>
                <h5>Average Goodreads User Rating (out of {work.ratings_count.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )})</h5>
                <Rating defaultRating={Math.round(average_rating)} maxRating={5} disabled />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => this.handleAuthorBookSearch(goodreads_author_id)}>Other Works by {author}</Button>
              { similar_books ? <Button onClick={() => this.handleViewSimilarBooks(selectedBookDetails)}>View Similar Books</Button> : null }
              <a href={ link } target='_blank'><Button>View Book on Goodreads</Button></a>
              { books.some(shelvedBook => shelvedBook.goodreads_book_id === goodreads_book_id) ? null : <Button onClick={() => this.handleBookSave(selectedBook, currentBookshelf)}>Save Book to Bookshelf</Button> }
            </Modal.Actions>
          </Modal>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = ({ book: { modalOpen, selectedBook, selectedBookDetails }, user: { currentBookshelf, user: { books, bookshelves, id } } }) => ({ books, bookshelves, currentBookshelf, id, modalOpen, selectedBook, selectedBookDetails })

export default connect(mapStateToProps, { clearSelectedBook, createDefaultBookshelf, saveUserBook, searchAuthorBooks, setDefaultBookshelf, viewSimilarBooks })(BookSearchDetailModal)
