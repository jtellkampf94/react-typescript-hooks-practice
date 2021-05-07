import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">React Hooks Using Typescript</Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/todos" className="nav-link">
          Todo App
        </Link>
        <Link to="/login" className="nav-link">
          Login App
        </Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
