import React from 'react'
import BookshelfList from '../components/BookshelfList'
import BookDetail from '../components/BookDetail'
import { Container } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Bookshelf = () => {

  // console.log("Bookshelf props:", props)
  return (
    <Container>
      <BookDetail />
      <BookshelfList />
    </Container>
  )
}

export default withAuth(Bookshelf)
