import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { logoutUser, clearSelectedBook } from '../actions'

const NavBar = ({clearSelectedBook, logoutUser, location: { pathname }, user: { loggedIn, user }}) => {

  return (
    <Menu pointing secondary>
      {loggedIn ? (
        <Fragment>
          <Menu.Item as={NavLink} to="/bookshelf" name="Bookshelf" onClick={clearSelectedBook} active={pathname === '/bookshelf'} />
          <Menu.Item as={NavLink} to="/search" name="Search Books" onClick={clearSelectedBook} active={pathname === '/search'} />
          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/login" name="Log out" onClick={() => logoutUser(user.name)} />
          </Menu.Menu>
        </Fragment>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} to="/login" name="Log In or Sign Up" active={pathname === '/login'} />
        </Menu.Menu>
      )}
    </Menu>
  )
}

const mapStateToProps = ({ user }) => ({ user })

export default withRouter(connect(mapStateToProps, { logoutUser, clearSelectedBook })(NavBar))
