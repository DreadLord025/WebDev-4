import React from "react";
import logo from "./logo.svg";
import Login from "./Login";
import Logout from "./Logout";

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <header className="App-header">
        <div className="logoPosition">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="menu">
          <a href="#">Головна</a>
          <a href="#">Про нас</a>
          <a href="#" style={{ marginBottom: '10px' }}>Контакти</a>
          {isLoggedIn ? (
            <Logout onLogoutClick={this.handleLogoutClick} />
          ) : (
            <Login onLoginClick={this.handleLoginClick} />
          )}
        </div>
      </header>
    );
  }
}

export default Header;
