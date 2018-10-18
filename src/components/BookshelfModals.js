import React from "react"
import { connect } from 'react-redux'
import BookDetailModal from './modals/BookDetailModal'
import BookshelfRenameModal from './modals/BookshelfRenameModal'
import ChangeBookCoverModal from './modals/ChangeBookCoverModal'

const BookshelfModals = ({ selectedBookDetails, selectedBook, currentBookshelf, selectedCover }) => {

  if (selectedCover && selectedBook && !selectedBookDetails) {
    return <ChangeBookCoverModal />
  } else if (currentBookshelf && !selectedBook && !selectedCover){
    return <BookshelfRenameModal />
  } else if (selectedBook && selectedBookDetails && !selectedCover) {
    return <BookDetailModal />
  } else {
    return null
  }
}

const mapStateToProps = ({ book: { selectedBook, selectedBookDetails, selectedCover }, user: { currentBookshelf } }) => ({ currentBookshelf, selectedBook, selectedBookDetails, selectedCover })

export default connect(mapStateToProps)(BookshelfModals)
