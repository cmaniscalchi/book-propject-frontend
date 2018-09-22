import React from 'react'
import SearchBar from '../components/SearchBar'
import BookSearchList from '../components/BookSearchList'
import BookDetail from '../components/BookDetail'
import { Container } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const BookSearch = () => {
  return (
    <Container>
      <SearchBar />
      <BookSearchList />
      <BookDetail />
    </Container>
  )
}

export default withAuth(BookSearch)
