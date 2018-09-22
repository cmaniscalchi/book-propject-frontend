import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { logout } from '../actions/userActions'

const NavBar = ({ user: { loggedIn }, location: { pathname } }) => {
  return (
    <Menu pointing secondary>
      {loggedIn ? (
        <Fragment>
          <Menu.Item as={NavLink} to="/bookshelf" name="Bookshelf" active={pathname === '/bookshelf'} />
          <Menu.Item as={NavLink} to="/search" name="Search Books" active={pathname === '/search'} />
          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/login" name="Logout" onClick={logout} />
          </Menu.Menu>
        </Fragment>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} to="/login" name="Login" active={pathname === '/login'} />
        </Menu.Menu>
      )}
    </Menu>
  )
}

const mapStateToProps = ({ user }) => ({ user })

export default withRouter(connect(mapStateToProps)(NavBar))
