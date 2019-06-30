import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookshelfBook from './BookshelfBook'
import { Grid } from 'semantic-ui-react'
import { clearSearchResults, clearSelectedBook, clearSelectedCover, setDefaultBookshelf } from '../actions'

class BookshelfList extends Component {

componentDidMount() {

    const { clearSelectedBook, clearSelectedCover, currentBookshelf, setDefaultBookshelf } = this.props;

    clearSelectedBook()
    clearSelectedCover()
    clearSearchResults()

    if (!currentBookshelf) {
        setDefaultBookshelf()
    }
}

    render() {

        const { user, bookCovers, currentBookshelf } = this.props;

        return !!currentBookshelf && !!user.books.length && (

            <Grid relaxed columns={4}>

                {!bookCovers.length && user.books
                    .filter(book => book.bookshelf_id === currentBookshelf.id)
                    .sort((bookA, bookB) => bookA.publication_year - bookB.publication_year)
                    .map(book => (

                        <BookshelfBook book={book} key={book.goodreads_book_id} />

                    ))
                }

                {!!bookCovers.length && bookCovers.map(cover => (

                    <BookshelfBook cover={cover} key={cover.imageId} />

                ))}

            </Grid>

        );
    }
}

const mapStateToProps = ({ book: { bookCovers }, user: { currentBookshelf, user } }) => ({ bookCovers, user, currentBookshelf })

export default connect(mapStateToProps, { clearSearchResults, clearSelectedBook, clearSelectedCover, setDefaultBookshelf })(BookshelfList)
