import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Segment, Image, Dropdown } from 'semantic-ui-react'
import { deletingUserBookshelves, managingUserBookshelves, openModal, switchUserBookshelf } from '../../actions'

class EmptyShelfHeader extends Component {

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
    const newUserImage = require('../../assets/img/Alexander-Deineka.jpg')

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
}

const mapStateToProps = ({ user: { currentBookshelf, user: {  bookshelves } } }) => ({ bookshelves, currentBookshelf })

export default connect(mapStateToProps, { deletingUserBookshelves, managingUserBookshelves, openModal, switchUserBookshelf })(EmptyShelfHeader)
