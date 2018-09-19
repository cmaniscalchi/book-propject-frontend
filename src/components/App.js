import React, { Component } from 'react'
import '../assets/css/App.css'
import SearchBar from './SearchBar'
import BookSearchList from './BookSearchList'
import BookDetail from './BookDetail'

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <BookSearchList />
        <BookDetail />
      </div>
    )
  }
}

export default App
