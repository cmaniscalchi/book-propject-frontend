import React from 'react'
import BookSearchBar from '../components/BookSearchBar'
import BookSearchList from '../components/BookSearchList'
import BookSearchDetailModal from '../components/modals/BookSearchDetailModal'
import { Container } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const BookSearch = () => {

  return (
    <Container style={{ padding: '2em 2em' }}>
      <BookSearchDetailModal />
      <BookSearchBar />
      <BookSearchList />
    </Container>
  )
}

export default withAuth(BookSearch)
