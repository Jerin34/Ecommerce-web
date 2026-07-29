import { Component } from "react";
import "./index.css";
import { showToast } from "../../components/Toast";class AddressForm extends Component{
  state = {
    fullName: "",
    phone: "",
    house: "",
    area: "",
    city: "",
    stateName: "",
    pincode: "",
    landmark: ""
  };

  onChangeFullName = event => {
    this.setState({ fullName: event.target.value });
  };

  onChangePhone = event => {
    this.setState({ phone: event.target.value });
  };

  onChangeHouse = event => {
    this.setState({ house: event.target.value });
  };

  onChangeArea = event => {
    this.setState({ area: event.target.value });
  };

  onChangeCity = event => {
    this.setState({ city: event.target.value });
  };

  onChangeState = event => {
    this.setState({ stateName: event.target.value });
  };

  onChangePincode = event => {
    this.setState({ pincode: event.target.value });
  };

  onChangeLandmark = event => {
    this.setState({ landmark: event.target.value });
  };
  componentDidMount() {
    const {editingAddress} = this.props;
    if (editingAddress) {
        this.setState({
            fullName: editingAddress.fullName,
            phone: editingAddress.phone,
            house: editingAddress.house,
            area: editingAddress.area,
            city: editingAddress.city,
            stateName: editingAddress.state,
            pincode: editingAddress.pincode,
            landmark: editingAddress.landmark || ""
        });
    }
}

  onSubmitForm = async event => {
    event.preventDefault();
    const {editingAddress} = this.props;

    const {
        fullName,
        phone,
        house,
        area,
        city,
        stateName,
        pincode,
        landmark
    } = this.state;

    const addressDetails = {
        fullName,
        phone,
        house,
        area,
        city,
        state: stateName,
        pincode,
        landmark
    };

    try {
        const token = localStorage.getItem("jwt_token");
        const url = editingAddress ? `http://localhost:5000/api/address/${editingAddress._id}`:"http://localhost:5000/api/address"
        const response = await fetch(
            url,
            {
                method: editingAddress ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(addressDetails)
            }
        );

        const data = await response.json();

        if (response.ok) {
 const {fetchAddress,closeForm,} = this.props
            fetchAddress();
            closeForm();
            showToast('success',data.message)
        } else {
            showToast('error ',data.message);
        }
    } catch (err) {
        showToast("error ",err.message);
    }
};
  render() {
    const {
      fullName,
      phone,
      house,
      area,
      city,
      stateName,
      pincode,
      landmark
    } = this.state;
const {editingAddress} = this.props
    return (
      <form className="address-form" onSubmit={this.onSubmitForm}>
        <h2>{ editingAddress ? "Edit Address" :"Add Address"}</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={this.onChangeFullName}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={this.onChangePhone}
        />

        <input
          type="text"
          placeholder="House / Flat / Building"
          value={house}
          onChange={this.onChangeHouse}
        />

        <input
          type="text"
          placeholder="Area / Street"
          value={area}
          onChange={this.onChangeArea}
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={this.onChangeCity}
        />

        <input
          type="text"
          placeholder="State"
          value={stateName}
          onChange={this.onChangeState}
        />

        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={this.onChangePincode}
        />

        <input
          type="text"
          placeholder="Landmark (Optional)"
          value={landmark}
          onChange={this.onChangeLandmark}
        />

        <div className="button-container">
          <button type="submit" className="save-btn">
          {editingAddress ? "Update Address" :"Save Address "}
          </button>

          <button type="button" className="cancel-btn" onClick={this.props.closeForm}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default AddressForm;