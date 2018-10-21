import React from 'react'
import BookSearchHeader from '../components/headers/BookSearchHeader'
import BookSearchList from '../components/BookSearchList'
import BookSearchDetailModal from '../components/modals/BookSearchDetailModal'
import { Container } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const BookSearch = () => {

  return (
    <Container style={{ padding: '2em 2em' }}>
      <BookSearchDetailModal />
      <BookSearchHeader />
      <BookSearchList />
    </Container>
  )
}

export default withAuth(BookSearch)
