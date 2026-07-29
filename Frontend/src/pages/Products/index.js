import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header";

import "./index.css";
import ClipLoader from "react-spinners/ClipLoader";
import Productitems from "../Productitems";
const apistatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  error: "ERROR",
};
const SORT_OPTIONS = {
    DEFAULT: 'DEFAULT',
    PRICE_LOW_HIGH: 'PRICE_LOW_HIGH',
    PRICE_HIGH_LOW: 'PRICE_HIGH_LOW',
    NAME_ASC: 'NAME_ASC',
    NAME_DESC: 'NAME_DESC',
};
const PRODUCTS_PER_PAGE = 6;
class Products extends Component {
  state = {
    productslist: [],
    apistatuses: apistatusConstants.initial,
    errorMsg: "",
    searchtext: "", 
    showFilter: false,
    selectedCategory: '',
    sortOption: SORT_OPTIONS.DEFAULT,
    currentPage:1,
  };
  onChangeSearchText = (e) => {
    this.setState({ searchtext: e.target.value,currentPage:1 });
  };
  changeFilter = () => {
    this.setState((prevState) => ({ showFilter: !prevState.showFilter }));
  };
  onChangeCategory = (e) => {
    this.setState({ selectedCategory: e.target.value,currentPage:1 });
  };
  onChangeSortoption = (e) => {
    this.setState({ sortOption: e.target.value,currentPage:1 });
  };
handleClearFilters = () =>{
  this.setState({
    searchtext: "",
    sortOption: SORT_OPTIONS.DEFAULT,
    selectedCategory:'',
    currentPage:1,
  })
}
  getProcessedProducts = () =>{
   const {productslist,searchtext,selectedCategory,sortOption} = this.state;
     const filteredProducts = productslist.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchtext.toLowerCase());
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      return matchesCategory && matchesSearch;
    })
    const sortedProducts = [...filteredProducts];

    switch (sortOption) {
      case SORT_OPTIONS.PRICE_LOW_HIGH:
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case SORT_OPTIONS.PRICE_HIGH_LOW:
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case SORT_OPTIONS.NAME_ASC:
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SORT_OPTIONS.NAME_DESC:
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return sortedProducts;
  }
renderEmptyState = () =>(
  <div className="emptyContainer">
    <h1 className="heading">No Products Found</h1>
    <p className="description">Try different category or search</p>
    <button className="btn" onClick={this.handleClearFilters}>Clear</button>
    </div>

)
  getPaginatedProducts = (sortedProducts) =>{
    const {currentPage} = this.state;
     const startIndex = PRODUCTS_PER_PAGE * (currentPage - 1);
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
    return paginatedProducts;
  }
     goToPreviousPage = () =>{
      const {currentPage} = this.state
      if(currentPage >1){
        this.setState(prevState => ({currentPage:prevState.currentPage-1}))
      }
    }
     goToNextPage = () =>{
      const {currentPage} = this.state
      const sortedProducts = this.getProcessedProducts();
      const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
      if(currentPage < totalPages){
        this.setState(prevState => ({currentPage:prevState.currentPage+1}))
      }
      
    }
  componentDidMount() {
    this.fetchProducts();
  }
  fetchProducts = async () => {
    this.setState({ apistatuses: apistatusConstants.loading });
    try {
      const url = "http://localhost:5000/api/products";
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        this.setState({
          productslist: data.products,
          apistatuses: apistatusConstants.success,
        });
      } else {
        this.setState({
          errorMsg: data.message,
          apistatuses: apistatusConstants.error,
        });
      }
    } catch (error) {
      this.setState({
        errorMsg: "Error while fetching products",
        apistatuses: apistatusConstants.error,
      });
    }
  };
  renderFailureView = () => (
    <div>
      <img src="/error.png" alt="Error" />
      <h1>{this.state.errorMsg}</h1>
    </div>
  );
  renderLoadingView = () => (
    <ClipLoader loading={true} size={50} color="#3498db" />
  );
  renderSuccessView = () => {
    const {
      // productslist,
      searchtext,
      showFilter,
      selectedCategory,
      sortOption,
      currentPage
    } = this.state;
    const processedProducts = this.getProcessedProducts();
    const paginatedProducts = this.getPaginatedProducts(processedProducts);
    const totalPages = Math.ceil(processedProducts.length / PRODUCTS_PER_PAGE);
    return (
      <div className="container">
        <Header />
        <div className="filterContainer">
          <h1 className="header">Products</h1>
          <div className="filter-controls">
            <span className="filter-icon" onClick={this.changeFilter}>
              <FontAwesomeIcon icon={faFilter} />
            </span>
            {showFilter && (
              <div className="filtersContainer">
                <select
                  value={selectedCategory}
                  onChange={this.onChangeCategory}
                >
                  <option value="">All Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Books">Books</option>
                </select>
                <select value={sortOption} onChange={this.onChangeSortoption}>
                  <option value={SORT_OPTIONS.DEFAULT}>Default</option>
                  <option value={SORT_OPTIONS.PRICE_LOW_HIGH}>Price: Low → High</option>
                  <option value={SORT_OPTIONS.PRICE_HIGH_LOW}>Price: High → Low</option>
                  <option value={SORT_OPTIONS.NAME_ASC}>Name: A → Z</option>
                  <option value={SORT_OPTIONS.NAME_DESC}>Name: Z → A</option>
                </select>
              </div>
            )}
          </div>
        </div>
        <input
          type="text"
          placeholder="Search here..."
          value={searchtext}
          onChange={this.onChangeSearchText}
        />
        {paginatedProducts.length > 0 ?(
        <ul className="product_list">
          {paginatedProducts.map((product) => (
            <Productitems key={product._id} products={product} />
          ))}
        </ul>
        ) :
        (this.renderEmptyState())
      }
        <div className="pagination-controls">
          <button disabled={currentPage === 1} onClick={this.goToPreviousPage} className="pagination-btn prev">Previous</button>
          <p className="pages">{currentPage} of {totalPages}</p>
          <button disabled={currentPage === totalPages} onClick={this.goToNextPage} className="pagination-btn next">Next</button>
        </div>
      </div>
    );
  };
  renderContentView = () => {
    const { apistatuses } = this.state;
    switch (apistatuses) {
      case apistatusConstants.loading:
        return this.renderLoadingView();
      case apistatusConstants.success:
        return this.renderSuccessView();
      case apistatusConstants.error:
        return this.renderFailureView();
      default:
        return null;
    }
  };
  render() {
    return <div>{this.renderContentView()}</div>;
  }
}
export default Products;
