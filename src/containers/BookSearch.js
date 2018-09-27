import React from 'react'
import SearchBar from '../components/SearchBar'
import BookSearchList from '../components/BookSearchList'
import BookSearchDetail from '../components/BookSearchDetail'
import { Container } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const BookSearch = () => {
  return (
    <Container style={{ padding: '2em 2em' }}>
      <SearchBar />
      <BookSearchDetail />
      <BookSearchList />
    </Container>
  )
}

export default withAuth(BookSearch)
