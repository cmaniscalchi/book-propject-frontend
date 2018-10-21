import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Segment, Dropdown } from 'semantic-ui-react'
import { deletingUserBookshelves, managingUserBookshelves, openModal, switchUserBookshelf } from '../../actions'

class BookshelfBooksHeader extends Component {

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

  render() {
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
}

const mapStateToProps = ({ user: { currentBookshelf, user: { bookshelves } } }) => ({ bookshelves, currentBookshelf })

export default connect(mapStateToProps, { deletingUserBookshelves, managingUserBookshelves, openModal, switchUserBookshelf })(BookshelfBooksHeader)
