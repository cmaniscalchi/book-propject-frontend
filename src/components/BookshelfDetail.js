import React, { Component } from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal, Rating, Form, Icon, Loader } from 'semantic-ui-react'
import { closeModal, renameUserBookshelf, selectCover, clearSelectedCover, clearSelectedBook, deleteUserBook, searchBookCovers, swapUserBookCover, clearCoverResults } from '../actions'

class BookshelfDetail extends Component {

  state = { input: '' }

  handleInputChange = event => {
    this.setState({ input: event.target.value })
  }

  handleFormSubmit = () => {
    let { currentBookshelf, renameUserBookshelf, closeModal } = this.props
    let { input } = this.state
    if (input !== '') {
      renameUserBookshelf(input, currentBookshelf.id)
      this.setState({ input: '' })
      closeModal()
    }
  }

  handleCoverSwap = (newCover, id) => {
    let { swapUserBookCover, clearSelectedBook, clearSelectedCover } = this.props
    swapUserBookCover(newCover, id)
    clearSelectedCover()
    clearSelectedBook()
    closeModal()
  }

  handleBookRemove = bookId => {
    let { deleteUserBook, clearSelectedBook } = this.props
    deleteUserBook(bookId)
    clearSelectedBook()
    closeModal()
  }

  handleBookCoverSearch = ({ title, author }) => {
    let { searchBookCovers, closeModal, bookCovers } = this.props
    searchBookCovers(title, author)
    if (bookCovers.length > 10) {
      closeModal()
    }
  }

  handleModalClose = () => {
    let { clearSelectedBook, clearSelectedCover, clearCoverResults, closeModal } = this.props
    clearSelectedBook()
    clearSelectedCover()
    clearCoverResults()
    closeModal()
  }

  render() {
    let { details, modalOpen, selectedBook, closeModal, currentBookshelf, selectedCover } = this.props
    let { input } = this.state

  // change book cover
    if (selectedCover && selectedBook && !details) {
      return (
        <div>
          <Modal open={modalOpen} onClose={closeModal} closeIcon >
            <Modal.Header className='modal'>Change a Book's Cover</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header as='h3'>Are you positive you'd like to make this change?</Header>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleModalClose}>
                <Icon name='remove' /> Return to Bookshelf
              </Button>
              <Button onClick={closeModal}>
                <Icon name='remove' /> Choose A Different Cover
              </Button>
              <Button onClick={() => this.handleCoverSwap(selectedCover.contentUrl, selectedBook.id)}>
                <Icon name='checkmark' /> Change It!
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      )
      // rename bookshelf modal only opens when nothing is selected
    } else if (currentBookshelf && !selectedBook && !selectedCover){
      return (
        <div>
          <Modal open={modalOpen} onClose={closeModal} closeIcon >
            <Modal.Header className='modal'>{currentBookshelf.name}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header as='h3'>Choose a new name for this bookshelf:</Header>
              </Modal.Description>
              <br />
              <Form.Input
                icon='book'
                iconPosition='left'
                value={input}
                onChange={this.handleInputChange}
                placeholder="Choose a name"
              />
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={closeModal}>
                <Icon name='remove' /> Cancel
              </Button>
              <Button onClick={this.handleFormSubmit}>
                <Icon name='checkmark' /> Rename
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      )
      // the book detail modal opens when a user has both selected a book & the details from a Goodreads API get request are returned
      } else if (selectedBook && details && !selectedCover) {
      let striptags = require('striptags')
      let { author, image_url, publication_year, title, id } = selectedBook

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
                <p>{striptags(details.description)}</p>
                <h5>Average Goodreads User Rating (out of {details.work.ratings_count.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )})</h5>
                <Rating defaultRating={Math.round(details.average_rating)} maxRating={5} disabled />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => this.handleBookCoverSearch(selectedBook)}>Display an Alternate Cover</Button>
              <Button onClick={() => this.handleBookRemove(id)}>Remove Book from Shelf</Button>
              <a href={ details.link } target='_blank'><Button>View Book on Goodreads</Button></a>
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
  cover: state.book.selectedCover,
  details: state.book.selectedBookDetails,
  modalOpen: state.book.modalOpen,
  bookCovers: state.book.bookCovers,
  currentBookshelf: state.user.user.currentBookshelf,
  selectedBook: state.book.selectedBook,
  selectedCover: state.book.selectedCover
})

export default connect(mapStateToProps, { closeModal, renameUserBookshelf, deleteUserBook, clearSelectedBook, selectCover, clearSelectedCover, searchBookCovers, swapUserBookCover, clearCoverResults })(BookshelfDetail)
