import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { logoutUser, resetSelectedBook } from '../actions'

const NavBar = ({ user: { loggedIn, user }, resetSelectedBook, logoutUser, location: { pathname } }) => {
  // debugger;

  return (
    <Menu pointing secondary>
      {loggedIn ? (
        <Fragment>
          <Menu.Item as={NavLink} to="/bookshelf" name="Bookshelf" onClick={resetSelectedBook} active={pathname === '/bookshelf'} />
          <Menu.Item as={NavLink} to="/search" name="Search Books" onClick={resetSelectedBook} active={pathname === '/search'} />
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

export default withRouter(connect(mapStateToProps, { logoutUser, resetSelectedBook })(NavBar))
