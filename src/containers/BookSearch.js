import React from 'react'
import BookSearchBar from '../components/BookSearchBar'
import BookSearchList from '../components/BookSearchList'
import BookSearchDetail from '../components/modals/BookSearchDetail'
import { Container } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const BookSearch = () => {

  return (
    <Container style={{ padding: '2em 2em' }}>
      <BookSearchBar />
      <BookSearchDetail />
      <BookSearchList />
    </Container>
  )
}

export default withAuth(BookSearch)
