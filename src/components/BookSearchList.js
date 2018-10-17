import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookSearchBook from './BookSearchBook'
import { Grid } from 'semantic-ui-react'
import { clearSearchResults } from '../actions'

class BookSearchList extends Component {

  componentDidMount() {
    this.props.clearSearchResults()
  }

  multiSearchResults = () => {
    let { searchResults } = this.props
    return (
      <div>
        <br />
        <Grid relaxed columns={4}>
          {searchResults.map(book => <BookSearchBook book={book} key={book.id} />)}
        </Grid>
      </div>
    )
  }

  singleSearchResult = () => {
    let { searchResults } = this.props
    return (
      <div>
        <br />
        <Grid relaxed columns={4}>
          <BookSearchBook book={searchResults[0]} key={searchResults[0].id} />)
        </Grid>
      </div>
    )
  }

  render() {
    let { searchResults } = this.props
    return searchResults ? (
      <div>
        {searchResults.length > 1 ? this.multiSearchResults() : null}
        {searchResults.length === 1 ? this.singleSearchResult() : null}
      </div>
    ) : null
  }
}

const mapStateToProps = ({ book: { searchResults } }) => ({ searchResults })

export default connect(mapStateToProps, { clearSearchResults })(BookSearchList)
