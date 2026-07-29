import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import Cartitem from "../Cartitem";
import Header from "../Header";
import "./index.css";
const apistatuses = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  error: "ERROR",
};
class Cart extends Component {
  state = {
    cartList: [],
    isloading: apistatuses.initial,
    errorMsg: "",
    redirectToCheckout: false,
  };

  removeItem = (cartItemId) => {
    this.setState((prevstate) => ({
      cartList: prevstate.cartList.filter((item) => item._id !== cartItemId),
    }));
  };
  componentDidMount() {
    this.fetchCarts();
  }

  fetchCarts = async () => {
    const jwt_token = localStorage.getItem("jwt_token");
    if (!jwt_token) {
      this.setState({
        isloading: apistatuses.error,
        errorMsg: "No User Found",
      });
      return;
    }

    this.setState({
      isloading: apistatuses.loading,
    });

    const url = "http://localhost:5000/api/cart";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        this.setState({
          cartList: data.cartItem,
          isloading: apistatuses.success,
        });
      } else {
        this.setState({
          isloading: apistatuses.error,
          errorMsg: data.message,
        });
      }
    } catch (error) {
      this.setState({
        isloading: apistatuses.error,
        errorMsg: "Failed to fetch data",
      });
    }
  };

  onrenderFaliure = () => (
    <div>
      <img src="/error.png" alt="Error" />
      <h1>{this.state.errorMsg}</h1>
    </div>
  );

  // 2. Update your loading method to use the React component
  onrenderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <TailSpin
        height="50"
        width="50"
        color="#0b69ff"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
      <h1>Loading...</h1>
    </div>
  );

  orenderSucces = () => {
    const { cartList } = this.state;

    return (
      <div className="cart-container">
        <Header />
        <ul className="cart-list-container">
          {cartList.map((cartItem) => (
            <Cartitem
              key={cartItem._id}
              cartItem={cartItem}
              removeCartItem={this.removeItem}
              refreshCarts={this.fetchCarts}
            />
          ))}
        </ul>
        <div className="cart-summary">
        
          <button
            className="order-btn"
            onClick={() => this.setState({ redirectToCheckout: true })}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  };

  onrenderContent = () => {
    const { isloading } = this.state;
    switch (isloading) {
      case apistatuses.loading:
        return this.onrenderLoading();
      case apistatuses.success:
        return this.orenderSucces();
      case apistatuses.error:
        return this.onrenderFaliure();
      default:
        return null;
    }
  };

  render() {
    if (this.state.redirectToCheckout) {
    return <Navigate to="/checkout" />;
}
    return <div>{this.onrenderContent()}</div>;
  }
}

export default Cart;
