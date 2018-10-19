import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Segment, Image, Dropdown } from 'semantic-ui-react'
import { clearCoverResults, clearSelectedCover, manageUserBookshelves, openModal } from '../actions'

const BookshelfHeader = ({ bookCovers, books, bookshelves, clearCoverResults, clearSelectedCover, currentBookshelf, manageUserBookshelves, modalOpen, openModal, selectedBook, selectedCover }) => {

  const handleCreateBookshelfModalOpen = () => {
    manageUserBookshelves()
    openModal()
  }

  const handleCoverClear = () => {
    clearCoverResults()
    clearSelectedCover()
  }


  const bookshelfHeader = () => {
    let bookshelvesArray = bookshelves.filter(bookshelf => bookshelf !== currentBookshelf).map(bookshelf => ({ text: bookshelf.name, value: bookshelf.name }))

    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>{currentBookshelf.name}</Header>
          <Header sub textAlign='center'>Select a Book to View Its Details, Change the Display Cover, or Remove It From Your Shelf</Header>
          <br />
          <div style={{display:'flex', justifyContent:'space-around'}}>
            {bookshelves.length > 1 ? (<Dropdown button className='icon' labeled icon='angle down' options={bookshelvesArray} style={{position: 'absolute', zIndex: 1}} text='Switch Bookshelves' onChange={event => console.log(event.target.value)}/>) : null}
            <Button onClick={openModal}>Rename This Bookshelf</Button>
            <Button onClick={handleCreateBookshelfModalOpen}>Create a New Shelf</Button>
          </div>
        </Segment>
        <br />
      </div>
    )
  }

  const newUserHeader = () => {
    const newUserImage = require('../assets/img/Alexander-Deineka.jpg')
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

  const changeCoverHeader = () => {
    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>Select a New Cover for {selectedBook.title}</Header>
          <Header sub textAlign='center'>Please note: The covers displayed here may not all match your book exactly;<br />
          they are our best guess at covers for this work.</Header>
          <br />
          <Button fluid onClick={handleCoverClear}>Cancel Book Cover Change</Button>
        </Segment>
        <br />
      </div>
    )
  }

  return (
    <div>
      {books.length > 0 && bookCovers.length === 0 && currentBookshelf ? bookshelfHeader() : null}
      {books.length === 0 && currentBookshelf ? newUserHeader() : null}
      {bookCovers.length > 0 && currentBookshelf ? changeCoverHeader() : null}
    </div>
  )
}

const mapStateToProps = ({ user: { currentBookshelf, user: { books, bookshelves } }, book: { bookCovers, modalOpen, selectedBook, selectedCover } }) => ({bookCovers, books, bookshelves, currentBookshelf, modalOpen, selectedBook })

export default connect(mapStateToProps, { clearCoverResults, clearSelectedCover, manageUserBookshelves, openModal })(BookshelfHeader)
