import React, { Component } from 'react'
import '../assets/css/App.css'
import Bookshelf from './Bookshelf'
import SearchBar from './SearchBar'
import BookSearchList from './BookSearchList'
import BookDetail from './BookDetail'

class App extends Component {
  render() {
    return (
      <div>
        <Bookshelf />
        <SearchBar />
        <BookSearchList />
        <BookDetail />
      </div>
    )
  }
}

export default App
