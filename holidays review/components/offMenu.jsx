import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { LogIn } from "../pages/LogIn";

export function OffcanvasExample(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Read user data when the navbar mounts onto the page
    const savedContext = localStorage.getItem("userContext");
    if (savedContext) {
      setUser(JSON.parse(savedContext));
    }
  }, []);

  const handleLogout = () => {
    // 2. Clear storage rows completely
    localStorage.removeItem("userContext");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    // 3. Redirect back to the login screen
    window.location.href = "/";
  };
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand className="logo" href="./">
              <img
                alt="holiday_review"
                src="/Logo5.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {user ? (
                    <>
                      <span className="navbar-text me-3">
                        Hello, {user.name}!
                      </span>
                      <Button variant="danger" size="sm" onClick={handleLogout}>
                        Log Out
                      </Button>
                    </>
                  ) : (
                    <Nav.Item>
                      <Button as="a" variant="success" href="/LogIn">
                        Log In
                      </Button>
                    </Nav.Item>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
