import React, { Component } from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal, Rating, Dropdown } from 'semantic-ui-react'
import { clearCoverResults, clearSelectedBook, clearSelectedCover, closeModal, deleteUserBook, searchBookCovers, moveUserBook } from '../../actions'

class BookDetailModal extends Component {

  state = {}

  handleBookRemove = bookId => {
    let { clearSelectedBook, clearSelectedCover, closeModal, deleteUserBook } = this.props
    deleteUserBook(bookId)
    clearSelectedBook()
    clearSelectedCover()
    closeModal()
  }

  handleBookCoverSearch = ({ author, title }) => {
    let { bookCovers, closeModal, searchBookCovers } = this.props
    searchBookCovers(title, author)
    if (bookCovers.length > 20) {
      closeModal()
    }
  }

  handleBookshelfChange = (event, { value }) => {
    let { closeModal, moveUserBook, selectedBook } = this.props
    this.setState({ value })
    moveUserBook(value, selectedBook.id)
    closeModal()
  }

  handleModalClose = () => {
    let { clearCoverResults, clearSelectedBook, clearSelectedCover, closeModal } = this.props
    clearSelectedBook()
    clearSelectedCover()
    clearCoverResults()
    closeModal()
  }

  render() {
    let striptags = require('striptags')
    let { bookshelves, currentBookshelf, modalOpen, selectedBook, selectedBookDetails } = this.props
    let bookshelvesArray = bookshelves.filter(bookshelf => bookshelf.id !== currentBookshelf.id).map(bookshelf => ({ key: bookshelf.name, text: bookshelf.name, value: bookshelf.id }))
    let { author, image_url, publication_year, title, id } = selectedBook
    let { average_rating, description, link, work } = selectedBookDetails
    const { value } = this.state
    return (
      <div>
        <Modal size='large' open={modalOpen} onClose={this.handleModalClose} closeIcon >
          <Modal.Header className='modal'>My Shelved Books</Modal.Header>
          <Modal.Content image>
            <Image size='medium' style={{minWidth:'255px', minHeight:'191px', maxWidth:'255px', maxHeight:'389px'}} src={image_url} />
            <Modal.Description>
              <Header as='h3'>{title} by {author}</Header>
              {publication_year ? <Header sub>Original Publication Year: {publication_year}</Header> : null}
              <br />
              <p>{striptags(description)}</p>
              <h5>Average Goodreads User Rating (out of {work.ratings_count.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )})</h5>
              <Rating defaultRating={Math.round(average_rating)} maxRating={5} disabled />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {bookshelves.length > 1 ? (<Dropdown button className='icon' labeled icon='angle down' options={bookshelvesArray} value={value} text='Move To A Different Shelf' onChange={this.handleBookshelfChange}/>) : null}
            <Button onClick={() => this.handleBookCoverSearch(selectedBook)}>Display an Alternate Cover</Button>
            <Button onClick={() => this.handleBookRemove(id)}>Remove Book from Shelf</Button>
            <a href={ link } target='_blank'><Button>View Book on Goodreads</Button></a>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({ book: { bookCovers, modalOpen, selectedBook, selectedBookDetails }, user: { currentBookshelf, user: { bookshelves } } }) => ({ bookCovers, bookshelves, currentBookshelf, modalOpen, selectedBook, selectedBookDetails })

export default connect(mapStateToProps, { clearCoverResults, clearSelectedBook, clearSelectedCover, closeModal, deleteUserBook, searchBookCovers, moveUserBook })(BookDetailModal)
