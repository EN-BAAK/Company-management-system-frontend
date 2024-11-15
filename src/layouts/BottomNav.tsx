import React from 'react'
import { NavLink } from 'react-router-dom'
import { GoGear } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import { Container, Nav } from 'react-bootstrap';

const BottomNav = (): React.ReactNode => {
  const { t: translating } = useTranslation("global")

  const isNavActive = ({ isActive }: { isActive: boolean }) => {
    return {
      fontWeight: isActive ? "600" : "normal",
      color: isActive ? "var(--c-main)" : "var(--c-black-main)",
      fontSize: isActive ? "1.7rem" : "1.5rem"
    }
  }


  return (
    <Container fluid className='bg-body-secondary rounded-top-4 position-relative' id='navbar'>
      <Nav className='d-flex justify-content-around py-2'>
        <Nav.Item className='text-center'>
          <NavLink
            to="/"
            className="nav-item flex-center flex-column"
            style={isNavActive}
          >
            <IoNewspaperOutline />
            <span>{translating("bottom-nav.shifts")}</span>
          </NavLink>
        </Nav.Item>

        <Nav.Item className='text-center'>
          <NavLink
            to="/settings"
            className="nav-item flex-center flex-column"
            style={isNavActive}
          >
            <GoGear />
            <span>{translating("bottom-nav.settings")}</span>
          </NavLink>
        </Nav.Item>
      </Nav>
    </Container>
  );
}

export default BottomNav;