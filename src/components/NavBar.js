import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Segment, Menu, Container, Image } from 'semantic-ui-react'
import { logoutUser, clearSelectedBook } from '../actions'


const NavBar = ({clearSelectedBook, logoutUser, location: { pathname }, user: { loggedIn, user }}) => {
  const logo = require('../assets/imgs/ex-libris.png')

  return (
    <Segment textAlign='center' style={{padding: '1em 1em'}} vertical >
      <Menu size='large' borderless style={{ border: 'none', boxShadow: 'none' }}>
        {loggedIn ? (
          <Container>
            <Image src={logo} style={{ width:'122px', height:'125px' }}  />
            <Menu.Item as='h1' name="Ex Libris" />
            <Menu.Item as={NavLink} to="/bookshelf" name="Bookshelf" onClick={clearSelectedBook} active={pathname === '/bookshelf'} />
            <Menu.Item as={NavLink} to="/search" name="Search Books" onClick={clearSelectedBook} active={pathname === '/search'} />
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/login" name="Log out" onClick={() => logoutUser(user.name)} />
            </Menu.Menu>
          </Container>
        ) : (
          <Container>
            <Menu.Item as='h1' name="Ex Libris" />
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/login" name="Log In or Sign Up" active={pathname === '/login'} />
            </Menu.Menu>
          </Container>
        )}
      </Menu>
    </Segment>
  )
}

const mapStateToProps = ({ user }) => ({ user })

export default withRouter(connect(mapStateToProps, { logoutUser, clearSelectedBook })(NavBar))
