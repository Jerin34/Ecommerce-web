import { Component } from "react";
import { showToast } from '../../components/Toast';
import "./index.css";
class EditProduct extends Component {
  state = {
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    price: "",
    stock: "",
    errorMsg: "",
  };
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  onChangeCategory = (e) => {
    this.setState({ category: e.target.value });
  };

  onChangeImageUrl = (e) => {
    this.setState({ imageUrl: e.target.value });
  };

  onChangePrice = (e) => {
    this.setState({ price: e.target.value });
  };

  onChangeStock = (e) => {
    this.setState({ stock: e.target.value });
  };

  handleCancel = () => {
    window.location.replace("/admin/products");
  };

  componentDidMount() {
    this.getProductDetails();
  }
  getProductDetails = async () => {
    try {
      const { id } = this.props;
      
      const token = localStorage.getItem("jwt_token");
      const url = `${process.env.REACT_APP_API_URL}/api/products/${id}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        this.setState({
          name: data.product.name,
          description: data.product.description,
          category: data.product.category,
          imageUrl: data.product.imageUrl,
          price: data.product.price,
          stock: data.product.stock,
        });
      } else {
        this.setState({ errorMsg: data.message });
      }
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  };
  updateProduct = async (e) => {
    e.preventDefault();
    try {
      const {id} = this.props;
      const token = localStorage.getItem("jwt_token");
      const { name, description, category, imageUrl, price, stock } =
        this.state;
      const productDetails = {
        name,
        description,
        category,
        imageUrl,
        price: Number(price),
        stock: Number(stock),
      };
      if (!name || !description || !category || !imageUrl || !price || !stock) {
        this.setState({ errorMsg: "Please fill all fields" });
        showToast("Please fill all fields", "error");
        return;
      }
      const url = `${process.env.REACT_APP_API_URL}/api/products/${id}`;
      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDetails),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        showToast(data.message, "success");
        this.setState({errorMsg: ''});
        window.location.replace("/admin/products");
      } else {
        this.setState({ errorMsg: data.message });
        showToast(data.message, "error");
      }
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }
  };

  renderForm = () => {
    const { name, description, category, imageUrl, price, stock, errorMsg } =
      this.state;
    return (
      <div className="edit-product-container">
        <h1>Edit Product</h1>
        <form onSubmit={this.updateProduct}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={this.onChangeName}
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter Description"
            value={description}
            onChange={this.onChangeDescription}
          />

          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            placeholder="Enter Category"
            value={category}
            onChange={this.onChangeCategory}
          />

          <label htmlFor="image">Image Url</label>
          <input
            type="url"
            id="image"
            placeholder="Enter Image Url"
            value={imageUrl}
            onChange={this.onChangeImageUrl}
          />

          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            value={price}
            onChange={this.onChangePrice}
          />

          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            placeholder="Enter Stock"
            value={stock}
            onChange={this.onChangeStock}
          />

          <div className="button-group">
            <button type="submit" className="btn btn-primary" >
              Update Product
            </button>
            <button type="button" className="btn btn-cancel" onClick={this.handleCancel}>
              Cancel
            </button>
          </div>
          {errorMsg && <p className="err-msg">{errorMsg}</p>}
        </form>
      </div>
    );
  };

  render() {
    return <>{this.renderForm()}</>;
  }
}
export default EditProduct;
