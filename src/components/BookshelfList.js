import React, { Component } from 'react'
import { connect } from 'react-redux'
import Book from './Book'
import { Grid } from 'semantic-ui-react'
import { setShelvedBooks } from '../actions'

class BookshelfList extends Component {

  componentDidMount() {
    let { setShelvedBooks, shelvedBooks } = this.props
    setShelvedBooks(shelvedBooks)
  }

  render() {
    let { shelvedBooks } = this.props
    return (
      <div>
        <Grid relaxed columns={4}>
          {shelvedBooks.length > 0 ? shelvedBooks.map(book => <Book book={book} key={book.goodreads_book_id} />) : null}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  shelvedBooks: state.user.user.books
})

export default connect(mapStateToProps, { setShelvedBooks })(BookshelfList)
