import React from "react";

class Login extends React.Component {
  render() {
    return <button onClick={this.props.onLoginClick}>Увійти</button>;
  }
}

export default Login;
