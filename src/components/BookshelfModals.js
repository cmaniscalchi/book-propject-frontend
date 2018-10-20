import React from "react"
import { connect } from 'react-redux'
import BookDetailModal from './modals/BookDetailModal'
import BookshelfDeleteModal from './modals/BookshelfDeleteModal'
import BookshelfRenameModal from './modals/BookshelfRenameModal'
import ChangeBookCoverModal from './modals/ChangeBookCoverModal'
import CreateBookshelfModal from './modals/CreateBookshelfModal'

const BookshelfModals = ({ currentBookshelf, deletingBookshelf, managingBookshelf, selectedBook, selectedBookDetails, selectedCover }) => {

  if (selectedBook && !selectedBookDetails && selectedCover) {
    return <ChangeBookCoverModal />
  } else if (selectedBook && selectedBookDetails && !selectedCover) {
    return <BookDetailModal />
  } else if (!managingBookshelf && !deletingBookshelf && currentBookshelf && !selectedBook && !selectedCover) {
    return <BookshelfRenameModal />
  } else if (managingBookshelf && !deletingBookshelf && currentBookshelf && !selectedBook && !selectedCover) {
    return <CreateBookshelfModal />
  } else if (!managingBookshelf && deletingBookshelf && currentBookshelf && !selectedBook && !selectedCover) {
    return <BookshelfDeleteModal />
  } else {
    return null
  }
}

const mapStateToProps = ({ book: { selectedBook, selectedBookDetails, selectedCover }, user: { currentBookshelf, deletingBookshelf, managingBookshelf } }) => ({ currentBookshelf, deletingBookshelf, managingBookshelf, selectedBook, selectedBookDetails, selectedCover })

export default connect(mapStateToProps)(BookshelfModals)
