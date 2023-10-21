import "./App.css";
import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import BodyComponent from "./BodyComponent";


class App extends Component {


  render() {

    return (
      <div className="App">
        <Header />
        <BodyComponent />
        <Footer />
      </div>
    );
  }
}

export default App;
