import React from 'react'
import SearchBar from '../components/SearchBar'
import BookSearchList from '../components/BookSearchList'
import BookDetail from '../components/BookDetail'
import { Container } from 'semantic-ui-react'

const BookSearch = () => {
  // console.log("BookSearchList props:", props)
  return (
    <Container>
      <SearchBar />
      <BookSearchList />
      <BookDetail />
    </Container>
  )
}

export default BookSearch
