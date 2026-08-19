import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  // Subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`site-header ${scrolled ? "scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand href="#home">ShopEase</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          {/* <Nav.Link href="#cart">Cart🛒 {cartItems.length}</Nav.Link> */}
          <Nav.Link as={Link} to="/cart">
            Cart 🛒 {cartItems.length}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
