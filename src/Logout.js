import React from "react";

class Logout extends React.Component {
  render() {
    return <button onClick={this.props.onLogoutClick}>Вийти</button>;
  }
}

export default Logout;
