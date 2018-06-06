import React, { Component } from "react";

import ProductGrid from "components/ProductGrid";

import "basscss/css/basscss.min.css";
import "./styles/app.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shop: null,
      products: null,
      checkout: null
    };
  }

  componentWillMount() {
    this.props.client.checkout.create().then(res => {
      this.setState({
        checkout: res
      });
    });

    this.props.client.product.fetchAll().then(res => {
      this.setState({
        products: res
      });
    });

    this.props.client.shop.fetchInfo().then(res => {
      this.setState({
        shop: res
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello, Ample World!</h1>
        {this.state.products && <ProductGrid products={this.state.products} />}
      </div>
    );
  }
}

export default App;
