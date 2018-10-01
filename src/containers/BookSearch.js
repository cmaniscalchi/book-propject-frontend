import React from 'react'
import SearchBar from '../components/SearchBar'
import BookSearchList from '../components/BookSearchList'
import BookSearchDetail from '../components/BookSearchDetail'
import { Container } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const BookSearch = () => {

  const background = require('../assets/imgs/exclusive_paper/exclusive_paper_@2X.png')

  return (
    // <div style={{ `backgroundImage: url(${background}), minHeight: 100%, width: 100%` }}>
      <Container style={{ padding: '2em 2em' }}>
        <SearchBar />
        <BookSearchDetail />
        <BookSearchList style={{ backgroundImage: `url(${background})` }}/>
      </Container>
    // </div>
  )
}

export default withAuth(BookSearch)
