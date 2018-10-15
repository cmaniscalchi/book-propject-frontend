import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Segment, Image, Modal, Icon, Form } from 'semantic-ui-react'
import { clearSelectedCover, setDefaultBookshelf, renameUserBookshelf } from '../actions'

class BookshelfHeader extends Component {

  state = { input: ''}

  componentDidMount() {
    let { setDefaultBookshelf, currentBookshelf } = this.props
    if (currentBookshelf) {
      return null
    } else {
      return setDefaultBookshelf()
    }
  }

  handleInputChange = event => {
    this.setState({ input: event.target.value })
  }

  handleFormSubmit = () => {
    let { currentBookshelf, renameUserBookshelf } = this.props
    let { input } = this.state
    if (input !== '') {
      renameUserBookshelf(input, currentBookshelf.id)
      this.setState({ input: '' })
    }
  }

  newUserHeader = () => {
    const newUserImage = require('../assets/img/Alexander-Deineka.jpg')
    let { currentBookshelf } = this.props
    return (
      <div>
        <Segment style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: 800 }}>
          <Header as='h2' textAlign='center'>{currentBookshelf.name}</Header>
          <Header sub textAlign='center'>Welcome to Ex Libris, your virtual bookshelf!<br />
          Begin by exploring books to add to your shelf.</Header>
          <br />
          <Image src={newUserImage} alt='Ex Libris' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '80%' }}/>
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

  switchBookshelf = () => {
    return (
      <div></div>
    )
  }

  createBookshelf = () => {
    return (
      <div></div>
    )
  }

  bookshelfHeader = () => {
    let { bookshelves, currentBookshelf, renameUserBookshelf } = this.props
    let {input} = this.state
    console.log(input)
    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>{currentBookshelf.name}</Header>
          <Header sub textAlign='center'>Select a Book to View Its Details, Change the Display Cover, or Remove It From Your Shelf</Header>
          <br />
          <div style={{display:'flex', justifyContent:'space-around'}}>
            <Modal trigger={<Button>Rename This Bookshelf</Button>} closeIcon >
              <Header icon='book' content={currentBookshelf.name} />
              <Modal.Content>
                <p>Choose a new name for this bookshelf:</p>
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
                <Button>
                  <Icon name='remove' /> Cancel
                </Button>
                <Button onClick={this.handleFormSubmit}>
                  <Icon name='checkmark' /> Rename
                </Button>
              </Modal.Actions>
            </Modal>
            {bookshelves.length > 1 ? <Button onClick={this.switchBookshelf}>Switch To Another Shelf</Button> : null}
            <Button onClick={this.createBookshelf}>Create a New Shelf</Button>
          </div>
        </Segment>
        <br />
      </div>
    )
  }

  render() {
    console.log("BookshelfHeader props:", this.props)
    let { shelvedBooks, bookCovers, currentBookshelf } = this.props
    return (
      <div>
        {bookCovers.length > 0 ? this.changeCoverHeader() : null}
        {shelvedBooks.length === 0 && currentBookshelf ? this.newUserHeader() : null}
        {shelvedBooks.length > 0 && bookCovers.length === 0 && currentBookshelf ? this.bookshelfHeader() : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  currentBookshelf: state.user.user.currentBookshelf,
  bookshelves: state.user.user.bookshelves,
  selectedCover: state.book.selectedCover,
  shelvedBooks: state.user.user.books,
  bookCovers: state.book.bookCovers,
})

export default connect(mapStateToProps, { clearSelectedCover, setDefaultBookshelf, renameUserBookshelf })(BookshelfHeader)
