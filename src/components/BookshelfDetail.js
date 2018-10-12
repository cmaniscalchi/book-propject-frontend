import React from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal, Rating } from 'semantic-ui-react'
import { deleteUserBook, clearSelectedBook, searchBookCovers } from '../actions'

const BookshelfDetail = ({ details, modalOpen, book, cover, deleteUserBook, clearSelectedBook, searchBookCovers, bookCovers }) => {
  // console.log("BookshelfDetail:", details, modalOpen, book, cover)

  const handleBookRemoveOnClick = bookId => {
    deleteUserBook(bookId)
    clearSelectedBook()
  }

  const handleBookCoverSearch = ({ title, author }) => {
    searchBookCovers(title, author)
    clearSelectedBook()
  }

  if (book && details) {
    let striptags = require('striptags')
    let { author, image_url, publication_year, title, id } = book

    return (
      <div>
        <Modal size='large' open={modalOpen} onClose={clearSelectedBook}>
          <Modal.Header className='modal'>My Shelved Books</Modal.Header>
          <Modal.Content image>
            <Image size='medium' style={{minWidth:'255px', minHeight:'191px', maxWidth:'255px', maxHeight:'389px'}} src={image_url} />
            <Modal.Description>
              <Header as='h3'>{title} by {author}</Header>
              { publication_year ? <Header sub>Original Publication Year: {publication_year}</Header> : null }
              <br />
              <p>{striptags(details.description)}</p>
              <h5>Average Goodreads User Rating (out of {details.work.ratings_count.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )})</h5>
              <Rating defaultRating={Math.round(details.average_rating)} maxRating={5} disabled />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => handleBookCoverSearch(book)}>Display an Alternate Cover</Button>
            <Button onClick={() => handleBookRemoveOnClick(id)}>Remove Book from Shelf</Button>
            <a href={ details.link } target='_blank'><Button>View Book on Goodreads</Button></a>
          </Modal.Actions>
        </Modal>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = state => ({
  book: state.book.selectedBook,
  cover: state.book.selectedCover,
  details: state.book.selectedBookDetails,
  modalOpen: state.book.modalOpen,
  bookCovers: state.book.bookCovers
})

export default connect(mapStateToProps, { deleteUserBook, clearSelectedBook, searchBookCovers })(BookshelfDetail)
