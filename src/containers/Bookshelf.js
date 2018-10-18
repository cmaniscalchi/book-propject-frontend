import React from 'react'
import BookshelfHeader from '../components/BookshelfHeader'
import BookshelfList from '../components/BookshelfList'
import BookshelfDetail from '../components/modals/BookshelfDetail'
import { Container } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Bookshelf = () => {
  return (
    <Container style={{ padding: '2em 2em' }}>
      <BookshelfDetail />
      <BookshelfHeader />
      <BookshelfList />
    </Container>
  )
}

export default withAuth(Bookshelf)
