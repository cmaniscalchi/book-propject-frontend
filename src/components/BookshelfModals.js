import React from "react"
import { connect } from 'react-redux'
import BookDetailModal from './modals/BookDetailModal'
import BookshelfRenameModal from './modals/BookshelfRenameModal'
import ChangeBookCoverModal from './modals/ChangeBookCoverModal'
import CreateBookshelfModal from './modals/CreateBookshelfModal'

const BookshelfModals = ({ currentBookshelf, managingBookshelves, selectedBook, selectedBookDetails, selectedCover }) => {

  if (selectedBook && !selectedBookDetails && selectedCover) {
    return <ChangeBookCoverModal />
  } else if (selectedBook && selectedBookDetails && !selectedCover) {
    return <BookDetailModal />
  } else if (!managingBookshelves && currentBookshelf && !selectedBook && !selectedCover) {
    return <BookshelfRenameModal />
  } else if (managingBookshelves && currentBookshelf && !selectedBook && !selectedCover) {
    return <CreateBookshelfModal />
  } else {
    return null
  }
}

const mapStateToProps = ({ book: { selectedBook, selectedBookDetails, selectedCover }, user: { currentBookshelf, managingBookshelves } }) => ({ currentBookshelf, managingBookshelves, selectedBook, selectedBookDetails, selectedCover })

export default connect(mapStateToProps)(BookshelfModals)
