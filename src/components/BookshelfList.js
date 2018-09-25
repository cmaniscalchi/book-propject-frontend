import React, { Component } from 'react'
import { connect } from 'react-redux'
import Book from './Book'
import { Grid } from 'semantic-ui-react'
import { setShelvedBooks } from '../actions'

class BookshelfList extends Component {

  componentDidMount() {
    this.props.setShelvedBooks(this.props.books)
  }

  render() {
    return (
      <div>
        <Grid relaxed columns={4}>
          {this.props.books.length > 0 ? this.props.books.map(book => <Book book={book} key={book.goodreads_book_id} />) : null}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  books: state.user.user.books
})

export default connect(mapStateToProps, { setShelvedBooks })(BookshelfList)
