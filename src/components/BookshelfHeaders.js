import React from 'react'
import { connect } from 'react-redux'
import BookshelfBooksHeader from './headers/BookshelfBooksHeader'
import ChangeCoverHeader from './headers/ChangeCoverHeader'
import EmptyShelfHeader from './headers/EmptyShelfHeader'

const BookshelfHeaders = ({ bookCovers, books, currentBookshelf }) => {

  if (currentBookshelf) {
    let shelvedBooks = books.filter(book => book.bookshelf_id === currentBookshelf.id)

    return (
      <div>
        {shelvedBooks.length > 0 && bookCovers.length === 0 ? <BookshelfBooksHeader /> : null}
        {shelvedBooks.length === 0 ? <EmptyShelfHeader /> : null}
        {bookCovers.length > 0 ? <ChangeCoverHeader /> : null}
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = ({ user: { currentBookshelf, user: { books } }, book: { bookCovers } }) => ({bookCovers, books, currentBookshelf })

export default connect(mapStateToProps)(BookshelfHeaders)
