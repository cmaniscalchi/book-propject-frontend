import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavBar = ({ user: { loggedIn }, location: { pathname } }) => {
  return (
    <Menu pointing secondary>
      {/* {loggedIn ? ( */}
      <Fragment>
        <Menu.Item as={NavLink} to="/bookshelf" name="Bookshelf" active={pathname === '/bookshelf'} />
        <Menu.Item as={NavLink} to="/search" name="Search Books" active={pathname === '/search'} />
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} to="/logout" name="Logout" active={pathname === '/logout'} />
        </Menu.Menu>
      </Fragment>
      {/* ) : ( */}
      <Menu.Item as={NavLink} to="/login" name="Login" active={pathname === '/login'} />
      {/* )} */}
    </Menu>
  )
}

const mapStateToProps = ({ user }) => ({ user })

export default withRouter(connect(mapStateToProps)(NavBar))
