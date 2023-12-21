/* eslint-disable */
import React, { useState } from "react"
import { HashLink as Link } from "react-router-hash-link"
import { NavbarBrand, Navbar, Nav, NavItem, NavbarToggler, Collapse } from "reactstrap"

import logo from "../../assets/images/logos/white-text.png"

const Header = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  /*--------------------------------------------------------------------------------*/
  /*To open NAVBAR in MOBILE VIEW                                                   */
  /*--------------------------------------------------------------------------------*/

  return (
    <div className='topbar' id='top'>
      <div className='header6'>
        <div className='po-relative container-xl'>
          <Navbar className='navbar-expand-lg h6-nav-bar'>
            <NavbarBrand href='/'>
              <img src={logo} alt='campuslands' />
            </NavbarBrand>
            <NavbarToggler onClick={toggle}>
              <span className='ti-menu'></span>
            </NavbarToggler>
            <Collapse isOpen={isOpen} navbar className='hover-dropdown font-14 justify-content-end' id='h6-info'>
              <Nav navbar className='ms-auto'>
                <NavItem>
                  <Link className='nav-link' to='/'>
                    Home
                  </Link>
                </NavItem>
              </Nav>
              {Object.keys(userData).length === 0 ? (
                ""
              ) : userData.Rol.Nombre === "ADMIN" ? (
                <div className='act-buttons'>
                  <Link className='btn btn-success-gradiant font-14' to='/admin'>
                    Administrar
                  </Link>
                </div>
              ) : (
                <div className='act-buttons'>
                  <Link className='btn btn-success-gradiant font-14' to='/curriculum'>
                    Curriculum
                  </Link>
                </div>
              )}

              {Object.keys(userData).length === 0 ? (
                <div className='act-buttons'>
                  <Link to='/register' className='btn btn-success-gradiant font-14'>
                    Registrate
                  </Link>
                </div>
              ) : (
                ""
              )}
            </Collapse>
          </Navbar>
        </div>
      </div>
    </div>
  )
}
export default Header
