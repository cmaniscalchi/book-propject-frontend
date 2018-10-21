import React from 'react'
import BookshelfHeaders from '../components/BookshelfHeaders'
import BookshelfList from '../components/BookshelfList'
import BookshelfModals from '../components/BookshelfModals'
import { Container } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Bookshelf = () => {
  return (
    <Container style={{ padding: '2em 2em' }}>
      <BookshelfModals />
      <BookshelfHeaders />
      <BookshelfList />
    </Container>
  )
}

export default withAuth(Bookshelf)
