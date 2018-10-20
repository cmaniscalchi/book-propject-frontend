import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Segment, Image, Dropdown } from 'semantic-ui-react'
import { clearCoverResults, clearSelectedCover, deletingUserBookshelves, managingUserBookshelves, openModal, switchUserBookshelf } from '../actions'

class BookshelfHeader extends Component {

  state = {}

  handleBookshelfChange = (event, { value }) => {
    let { switchUserBookshelf } = this.props
    this.setState({ value })
    switchUserBookshelf(value)
  }

  handleCreateBookshelfModalOpen = () => {
    let { managingUserBookshelves, openModal } = this.props
    managingUserBookshelves()
    openModal()
  }

  handleBookshelfDeleteModalOpen = () => {
    let { deletingUserBookshelves, openModal } = this.props
    deletingUserBookshelves()
    openModal()
  }

  handleCoverClear = () => {
    let { clearCoverResults, clearSelectedCover } = this.props
    clearCoverResults()
    clearSelectedCover()
  }

  bookshelfHeader = () => {
    let { bookshelves, currentBookshelf, openModal } = this.props
    let bookshelvesArray = bookshelves.filter(bookshelf => bookshelf.id !== currentBookshelf.id).map(bookshelf => ({ key: bookshelf.name, text: bookshelf.name, value: bookshelf.id }))
    const { value } = this.state
    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>{currentBookshelf.name}</Header>
          <Header sub textAlign='center'>Select a Book to View Its Details, Change the Display Cover, or Remove It From Your Shelf</Header>
          <br />
          <div style={{display:'flex', justifyContent:'space-around'}}>
            {bookshelves.length > 1 ? (<Dropdown button className='icon' labeled icon='angle down' options={bookshelvesArray} value={value} style={{zIndex:1}} text='Switch Bookshelves' onChange={this.handleBookshelfChange}/>) : null}
            <Button onClick={openModal}>Rename This Bookshelf</Button>
            <Button onClick={this.handleCreateBookshelfModalOpen}>Create a New Shelf</Button>
            {bookshelves.length > 1 ? <Button onClick={this.handleBookshelfDeleteModalOpen}>Delete This Bookshelf</Button> : null}
          </div>
          <br />
        </Segment>
        <br />
      </div>
    )
  }

  emptyShelfHeader = () => {
    let { bookshelves, currentBookshelf, openModal } = this.props
    let bookshelvesArray = bookshelves.filter(bookshelf => bookshelf.id !== currentBookshelf.id).map(bookshelf => ({ key: bookshelf.name, text: bookshelf.name, value: bookshelf.id }))
    const { value } = this.state
    const newUserImage = require('../assets/img/Alexander-Deineka.jpg')
    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>{currentBookshelf.name}</Header>
          <Header sub textAlign='center'>Sorry, no books here yet!<br />
          Head on over to search to add to your shelf.</Header>
          <br />
          <Image src={newUserImage} alt='Ex Libris' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '75%' }}/>
          <br />
          <div style={{display:'flex', justifyContent:'space-around'}}>
            {bookshelves.length > 1 ? (<Dropdown button className='icon' labeled icon='angle down' options={bookshelvesArray} value={value} style={{zIndex:1}} text='Switch Bookshelves' onChange={this.handleBookshelfChange}/>) : null}
            <Button onClick={openModal}>Rename This Bookshelf</Button>
            {bookshelves.length > 1 ? <Button onClick={this.handleBookshelfDeleteModalOpen}>Delete This Bookshelf</Button> : null}
            <Link to="/search"><Button style={{width:'197px'}}>Go To Search</Button></Link>
          </div>
        </Segment>
        <br />
      </div>
    )
  }

  changeCoverHeader = () => {
    let { selectedBook } = this.props
    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>Select a New Cover for {selectedBook.title}</Header>
          <Header sub textAlign='center'>Please note: The covers displayed here may not all match your book exactly;<br />
          they are our best guess at covers for this work.</Header>
          <br />
          <Button fluid onClick={this.handleCoverClear}>Cancel Book Cover Change</Button>
        </Segment>
        <br />
      </div>
    )
  }

  render() {
    let { bookCovers, books, currentBookshelf } = this.props
    if (currentBookshelf) {
      let shelvedBooks = books.filter(book => book.bookshelf_id === currentBookshelf.id)
      return (
        <div>
          {shelvedBooks.length > 0 && bookCovers.length === 0 ? this.bookshelfHeader() : null}
          {shelvedBooks.length === 0 ? this.emptyShelfHeader() : null}
          {bookCovers.length > 0 ? this.changeCoverHeader() : null}
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = ({ user: { currentBookshelf, user: { books, bookshelves } }, book: { bookCovers, modalOpen, selectedBook, selectedCover } }) => ({bookCovers, books, bookshelves, currentBookshelf, modalOpen, selectedBook })

export default connect(mapStateToProps, { clearCoverResults, clearSelectedCover, deletingUserBookshelves, managingUserBookshelves, openModal, switchUserBookshelf })(BookshelfHeader)
