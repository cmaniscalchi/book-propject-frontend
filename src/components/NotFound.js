import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth'
import { Container, Header, Image, Segment, Button } from 'semantic-ui-react'

const NotFound = ({ loggedIn }) => {

  const notFoundImage = require('../assets/img/Albert-Reuss.jpg')
  // console.log(loggedIn ? "true" : "false")

  return (
    <Container style={{ padding: '2em 2em' }}>
      <Segment style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: 600 }}>
        <Header as='h2' textAlign='center'>Page Not Found</Header>
        <Header sub textAlign='center'>Sorry, nothing to see here.</Header>
        <br />
        <Image src={notFoundImage} alt='Ex Libris' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '80%' }}/>
        <br />
        {loggedIn ? <Link to="/search"><Button fluid>Go To Search</Button></Link> : <Link to="/login"><Button fluid>Log In or Sign Up</Button></Link>}
      </Segment>
    </Container>
  )
}

const mapStateToProps = ({ user: { loggedIn } }) => ({ loggedIn })

export default withAuth(connect(mapStateToProps)(NotFound))
