import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BookshelfModal from './BookshelfModal'
import { Button, Header, Segment, Image } from 'semantic-ui-react'
import { clearSelectedCover, setDefaultBookshelf, openModal } from '../actions'

class BookshelfHeader extends Component {

  componentDidMount() {
    let { setDefaultBookshelf, currentBookshelf } = this.props
    if (currentBookshelf) {
      return null
    } else {
      return setDefaultBookshelf()
    }
  }

  bookshelfHeader = () => {
    let { bookshelves, currentBookshelf, openModal, modalOpen, selectedCover } = this.props
    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>{currentBookshelf.name}</Header>
          <Header sub textAlign='center'>Select a Book to View Its Details, Change the Display Cover, or Remove It From Your Shelf</Header>
          <br />
          <div style={{display:'flex', justifyContent:'space-around'}}>
            <Button onClick={openModal}>Rename This Bookshelf</Button>
            {bookshelves.length > 1 ? <Button onClick={this.switchBookshelf}>Switch To Another Shelf</Button> : null}
            <Button onClick={this.createBookshelf}>Create a New Shelf</Button>
          </div>
          {modalOpen && !selectedCover ? <BookshelfModal /> : null}
        </Segment>
        <br />
      </div>
    )
  }

  newUserHeader = () => {
    const newUserImage = require('../assets/img/Alexander-Deineka.jpg')
    let { currentBookshelf } = this.props
    return (
      <div>
        <Segment style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: 800 }}>
          <Header as='h2' textAlign='center'>{currentBookshelf.name}</Header>
          <Header sub textAlign='center'>Sorry, no books here yet!<br />
          Head on over to search to add to your shelf.</Header>
          <br />
          <Image src={newUserImage} alt='Ex Libris' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '75%' }}/>
          <br />
          <Link to="/search"><Button fluid>Go To Search</Button></Link>
        </Segment>
        <br />
      </div>
    )
  }

  changeCoverHeader = () => {
    let { clearSelectedCover, selectedCover } = this.props
    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>Select a New Cover for {selectedCover.title}</Header>
          <Header sub textAlign='center'>Please note: The covers displayed here may not all match your book exactly;<br />
          they are Google Books's best guess at covers for this work.</Header>
          <br />
          <Button fluid onClick={clearSelectedCover}>Cancel Book Cover Change</Button>
        </Segment>
        <br />
      </div>
    )
  }

  render() {
    // console.log("BookshelfHeader props:", this.props)
    let { shelvedBooks, bookCovers, currentBookshelf } = this.props
    return (
      <div>
        {shelvedBooks.length > 0 && bookCovers.length === 0 && currentBookshelf ? this.bookshelfHeader() : null}
        {shelvedBooks.length === 0 && currentBookshelf ? this.newUserHeader() : null}
        {bookCovers.length > 0 ? this.changeCoverHeader() : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  currentBookshelf: state.user.user.currentBookshelf,
  bookshelves: state.user.user.bookshelves,
  shelvedBooks: state.user.user.books,
  selectedCover: state.book.selectedCover,
  modalOpen: state.book.modalOpen,
  bookCovers: state.book.bookCovers,
})

export default connect(mapStateToProps, { clearSelectedCover, setDefaultBookshelf, openModal })(BookshelfHeader)
