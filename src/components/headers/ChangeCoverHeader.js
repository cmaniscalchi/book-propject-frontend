import React from 'react'
import { connect } from 'react-redux'
import { Button, Header, Segment } from 'semantic-ui-react'
import { clearCoverResults, clearSelectedCover } from '../../actions'

const ChangeCoverHeader = ({ clearCoverResults, clearSelectedCover, selectedBook }) => {

  const handleCoverClear = () => {
    clearCoverResults()
    clearSelectedCover()
  }

  return (
    <div>
      <Segment>
        <Header as='h2' textAlign='center'>Select a New Cover for {selectedBook.title}</Header>
        <Header sub textAlign='center'>Please note: The covers displayed here may not all match your book exactly;<br />
        they are our best guess at covers for this work.</Header>
        <br />
        <Button fluid onClick={handleCoverClear}>Cancel Book Cover Change</Button>
      </Segment>
      <br />
    </div>
  )
}

const mapStateToProps = ({ book: { selectedBook } }) => ({ selectedBook })

export default connect(mapStateToProps, { clearCoverResults, clearSelectedCover })(ChangeCoverHeader)
