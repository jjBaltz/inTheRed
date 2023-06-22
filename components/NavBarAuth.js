/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>inThe<font color="#bd0000">Red</font></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link className="navProfile">Profile</Nav.Link>
            </Link>
            <Link passHref href="/resources">
              <Nav.Link className="navRes">Resources</Nav.Link>
            </Link>
            <Link passHref href="/resource/newResource">
              <Nav.Link className="navNewRes">Add New Resource</Nav.Link>
            </Link>
            <Link passHref href="/folders">
              <Nav.Link className="navJournal">Journal</Nav.Link>
            </Link>
            <Link passHref href="/entry/newEntry">
              <Nav.Link className="navNewEn">New Entry</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Button className="signOut" onClick={signOut}>Sign Out</Button>
      </Container>
    </Navbar>
  );
}
