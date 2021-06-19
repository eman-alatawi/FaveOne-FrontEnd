import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import PersonIcon from "@material-ui/icons/Person";

export default function NavBar(props) {
  return (
    <nav>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="bg-gray-800 shadow"
      >
        <Navbar.Brand>
          <Link
            to="/"
            className="text-gray-200 ml-5 mr-11 text-2xl hover:text-pink-600"
          >
            <span className="material-icons">star</span>FaveOne
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title="Movies - Dramas"
              id="collasible-nav-dropdown"
              className="mr-11 text-xl"
            >
              <NavDropdown.Item>
                <Link to="/movieDramaIndex" className="dropDownLink">
                  {" "}
                  Movies - Dramas
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/imageGalleryIndex" className="dropDownLink">
                  {" "}
                  Image Galleries
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/genderIndex" className="dropDownLink">
                  {" "}
                  Catagories
                </Link>
              </NavDropdown.Item>

              {props.isAuth && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/addMovieDrama" className="dropDownLink">
                      Add Movie - Drama
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/addImageGallery" className="dropDownLink">
                      {" "}
                      Add Image Gallery
                    </Link>
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            <NavDropdown
              title="Episodes"
              id="collasible-nav-dropdown"
              className="mr-11 text-xl"
            >
              <NavDropdown.Item>
                <Link to="/episodeIndex" className="dropDownLink">
                  {" "}
                  Episodes
                </Link>
              </NavDropdown.Item>
              {props.isAuth && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/addEpisode" className="dropDownLink">
                      Add Episode
                    </Link>
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
            <NavDropdown
              title="Actors"
              id="collasible-nav-dropdown"
              className="mr-11 text-xl"
            >
              <NavDropdown.Item>
                <Link to="/actorIndex" className="dropDownLink">
                  {" "}
                  Actors
                </Link>
              </NavDropdown.Item>
              {props.isAuth && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/addActor" className="dropDownLink">
                      Add Actor
                    </Link>
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            <SearchBar
              value={props.filterValue}
              onChange={props.handleFilterChange}
            ></SearchBar>
          </Nav>
          <Nav className="mr-5">
            {props.isAuth ? (
              <>
                {props.user && (
                  <Navbar.Text className="mr-5">
                    {" "}
                    <span className="text-gray-400">{props.user.sub}</span>{" "}
                    <Link to="/changePassword">
                      {" "}
                      <span className="text-pink-800">
                        <PersonIcon />{" "}
                      </span>
                    </Link>
                  </Navbar.Text>
                )}

                <Nav.Link>
                  {" "}
                  <Link
                    to="/logout"
                    onClick={props.onLogoutHandeler}
                    className="mr-5 hover:text-gray-200 text-pink-600 text-sm"
                  >
                    Say Bye
                  </Link>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link>
                  {" "}
                  <Link
                    to="/register"
                    className="text-gray-200 hover:text-pink-600 text-xl"
                  >
                    Join
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  {" "}
                  <Link
                    to="/login"
                    className=" text-gray-200 hover:text-pink-600 text-xl"
                  >
                    Login
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
}
