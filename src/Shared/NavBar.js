import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StarIcon from '@material-ui/icons/Star';

export default function NavBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <StarIcon fontSize="large" />FaveOne
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
                    <div>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <AccountCircleIcon fontSize="large" color="secondary" />
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <Link to="/profile">
                          <MenuItem onClick={handleClose}>
                            <span className="text-gray-600">
                              <PersonIcon /> Profile
                            </span>
                          </MenuItem>
                        </Link>

                        <Link to="/changePassword">
                          <MenuItem onClick={handleClose}>
                            <span className="text-gray-600">
                              <VpnKeyIcon /> ChangePassword
                            </span>
                          </MenuItem>
                        </Link>

                        <Link to="/logout" onClick={props.onLogoutHandeler}>
                          <MenuItem onClick={handleClose}>
                            <span className="text-gray-600">
                              <ExitToAppIcon /> Say Bye
                            </span>
                          </MenuItem>
                        </Link>
                      </Menu>
                    </div>
                  </Navbar.Text>
                )}
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
