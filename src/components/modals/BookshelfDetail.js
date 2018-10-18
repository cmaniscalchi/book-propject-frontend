import React, { Component } from "react"
import { connect } from 'react-redux'
import { Button, Header, Image, Modal, Rating, Form, Icon } from 'semantic-ui-react'
import { clearCoverResults, clearSelectedBook, clearSelectedCover, closeModal, createNewBookshelf, deleteUserBook, renameUserBookshelf, searchBookCovers, selectCover, swapUserBookCover } from '../../actions'

class BookshelfDetail extends Component {

  state = { input: '' }

  handleInputChange = event => {
    this.setState({ input: event.target.value })
  }

  handleRenameFormSubmit = () => {
    let { closeModal, currentBookshelf, renameUserBookshelf } = this.props
    let { input } = this.state
    if (input !== '') {
      renameUserBookshelf(input, currentBookshelf.id)
      this.setState({ input: '' })
      closeModal()
    }
  }

  handleBookshelfCreateFormSubmit = () => {
    let { closeModal, createNewBookshelf, id } = this.props
    let { input } = this.state
    if (input !== '') {
      createNewBookshelf(id, input)
      this.setState({ input: '' })
      closeModal()
    }
  }

  handleCoverSwap = (newCover, id) => {
    let { clearSelectedBook, clearSelectedCover, swapUserBookCover } = this.props
    swapUserBookCover(newCover, id)
    clearSelectedCover()
    clearSelectedBook()
    closeModal()
  }

  handleBookRemove = bookId => {
    let { clearSelectedBook, deleteUserBook } = this.props
    deleteUserBook(bookId)
    clearSelectedBook()
    closeModal()
  }

  handleBookCoverSearch = ({ author, title }) => {
    let { bookCovers, closeModal, searchBookCovers } = this.props
    searchBookCovers(title, author)
    if (bookCovers.length > 20) {
      closeModal()
    }
  }

  handleModalClose = () => {
    let { clearCoverResults, clearSelectedBook, clearSelectedCover, closeModal } = this.props
    clearSelectedBook()
    clearSelectedCover()
    clearCoverResults()
    closeModal()
  }

  changeBookCoverModal = () => {
    let { closeModal, modalOpen, selectedBook, selectedCover } = this.props
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
              <Icon name='undo' /> Choose A Different Cover
            </Button>
            <Button onClick={() => this.handleCoverSwap(selectedCover.contentUrl, selectedBook.id)}>
              <Icon name='checkmark' /> Change It!
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

  bookshelfRenameModal = () => {
    let { modalOpen, closeModal, currentBookshelf } = this.props
    let { input } = this.state
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
  }

  // createBookshelfModal = () => {
  //   let { currentBookshelf, modalOpen, closeModal } = this.props
  //     let { input } = this.state
  //     return (
  //       <div>
  //         <Modal open={modalOpen} onClose={closeModal} closeIcon >
  //           <Modal.Header className='modal'>Create a New Bookshelf</Modal.Header>
  //           <Modal.Content>
  //             <Modal.Description>
  //               <Header as='h3'>Choose a name for your book:</Header>
  //             </Modal.Description>
  //             <br />
  //             <Form.Input
  //               icon='book'
  //               iconPosition='left'
  //               value={input}
  //               onChange={this.handleInputChange}
  //               placeholder="Choose a name"
  //             />
  //           </Modal.Content>
  //           <Modal.Actions>
  //             <Button onClick={closeModal}>
  //               <Icon name='remove' /> Cancel
  //             </Button>
  //             <Button onClick={this.handleBookshelfCreateFormSubmit}>
  //               <Icon name='checkmark' /> Rename
  //             </Button>
  //           </Modal.Actions>
  //         </Modal>
  //       </div>
  //     )
  //   }
  // }

  bookDetailModal = () => {
    let striptags = require('striptags')
    let { selectedBookDetails, modalOpen, selectedBook } = this.props
    let { author, image_url, publication_year, title, id } = selectedBook
    let { average_rating, description, link, work } = selectedBookDetails
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
            <Button onClick={() => this.handleBookCoverSearch(selectedBook)}>Display an Alternate Cover</Button>
            <Button onClick={() => this.handleBookRemove(id)}>Remove Book from Shelf</Button>
            <a href={ link } target='_blank'><Button>View Book on Goodreads</Button></a>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

  render() {
    let { selectedBookDetails, selectedBook, currentBookshelf, selectedCover } = this.props
    if (selectedCover && selectedBook && !selectedBookDetails) {
      return this.changeBookCoverModal()
    } else if (currentBookshelf && !selectedBook && !selectedCover){
      return this.bookshelfRenameModal()
    } else if (selectedBook && selectedBookDetails && !selectedCover) {
      return this.bookDetailModal()
    } else {
      return null
    }
  }
}

const mapStateToProps = ({ book: { bookCovers, selectedBook, selectedBookDetails, selectedCover, modalOpen }, user: { currentBookshelf } }) => ({ bookCovers, currentBookshelf, selectedBook, selectedBookDetails, selectedCover, modalOpen })

export default connect(mapStateToProps, { clearCoverResults, clearSelectedBook, clearSelectedCover, closeModal, createNewBookshelf, deleteUserBook, renameUserBookshelf, searchBookCovers, selectCover, swapUserBookCover })(BookshelfDetail)
