import React from 'react'
import BookshelfList from '../components/BookshelfList'
import BookshelfDetail from '../components/BookshelfDetail'
import { Container } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Bookshelf = () => {
  return (
    <Container style={{ padding: '2em 2em' }}>
      <BookshelfDetail />
      <BookshelfList />
    </Container>
  )
}

export default withAuth(Bookshelf)
