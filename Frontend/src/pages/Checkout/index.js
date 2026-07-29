import { Component } from "react";
import {showToast} from "../../components/Toast";
import "./index.css";

const apistatuses = {
    initial:'INITIAL',
    loading:"LOADING",
    success:'SUCCESS',
    error:'ERROR'
}
class Checkout extends Component {
  state = {
    addresses: [],
    selectedAddress: null,
    isloading: apistatuses.initial,
    errorMsg: "",
    cartList:[],

  };
  
  componentDidMount() {
    this.fetchAddress();
    this.fetchCarts()
  }
  onSelectAddress = (id) => {
    this.setState({
      selectedAddress: id,
    });
  };
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


  fetchAddress = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      const url = "http://localhost:5000/api/address";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        const defaultAddress = data.addresses.find(
          (address) => address.isDefault,
        );
        this.setState({
          addresses: data.addresses,
          selectedAddress: defaultAddress ? defaultAddress._id : null,
          isloading:apistatuses.success,
        });
      } 
      else {
        showToast( data.message,'error');
        this.setState({
          isloading: apistatuses.error,
          errorMsg:data.message
        });
      }
    } catch (err) {
      showToast(err.message,'error');
    }
  };
  
orenederSuccess = () => {   
  const { addresses, selectedAddress } = this.state;
  return (
    <div className="checkout-container">
      <h1 className="checkout-title">CHECKOUT</h1>
      <div className="address-list">
        {addresses.length === 0 && <p>No saved addresses.</p>}
        {addresses.map((each) => (
          <div
            key={each._id}
            className={`address-card ${selectedAddress === each._id ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="address"
              value={each._id}
              checked={selectedAddress === each._id}
              onChange={() => this.onSelectAddress(each._id)}
            />
            <div className="address-info">
              <h4 className="address-name">{each.fullName}</h4>
              <p className="address-meta">
                {each.area}, {each.city}, {each.state}
              </p>
              <p className="address-phone">{each.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PlaceOrder = async () => {
  if (!this.state.selectedAddress) {
    showToast("Please save an address before placing your order.", "error");
    return;
  }
  try {
    const jwt_token = localStorage.getItem("jwt_token");
    const url = "http://localhost:5000/api/orders";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },
      body: JSON.stringify({
        addressId: this.state.selectedAddress,
      }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
   if(response.ok){
     showToast("success",data.message)
   }else{
    showToast("error",data.message)
   }
  } catch (error) {
    showToast("error",error.message)
  }
};

   
    
    onrenderFailure = () => {
      return (
        <div className="checkout-container">
          <h1 className="checkout-title">CHECKOUT</h1>
          <p className="checkout-error">{this.state.errorMsg}</p>
        </div>
      );
    };
    onrenderLoading = () =>(
      <div>
        <h1>Loading</h1>
      </div>
    )
onrenderStatus = () =>{
  const { isloading } = this.state;
  switch (isloading) {
    case apistatuses.loading:
      return this.onrenderLoading();
    case apistatuses.success:
      return this.orenederSuccess();
    case apistatuses.error:
      return this.onrenderFailure();
    default:
      return null;
  }
}
  render() {
    const {cartList} = this.state
      const total = cartList.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price;
    }, 0);
    return (
      <div>
        <div className="checkout-main-container">
          {this.onrenderStatus()}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartList.map((item) => (
                <div key={item._id} className="order-item">
                  <img src={item.product.imageUrl} alt={item.product.name} />
                  <span>{item.product.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="total-amount">
              <strong>Total: ₹{total.toFixed(2)}</strong>
            </div>
            <button className="place-order-btn" onClick={this.PlaceOrder} >
              Place Order
            </button>
          </div>
        </div>
        </div>
    );
  }
}
export default Checkout;
