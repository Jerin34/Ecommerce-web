import {Component} from 'react'
import './index.css'
import AdminHeader from '../AdminHeader'
const apistatuses = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    loading: 'LOADING',
}

class AdminProducts extends Component {
    state = {
        productsList: [],
        isloading: apistatuses.initial,
        errorMsg: '',
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = async () => {
        try {
            this.setState({isloading: apistatuses.loading})
            const token = localStorage.getItem('jwt_token')
            const url = `${process.env.REACT_APP_API_URL}/api/products`;
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const response = await fetch(url, options);
            const data = await response.json();
             
            if (response.ok) {
                this.setState({productsList: data.products, isloading: apistatuses.success})
            } else {
                this.setState({isloading: apistatuses.failure, errorMsg: data.message})
            }
        } catch(error) {
            this.setState({isloading: apistatuses.failure, errorMsg: error.message})
        } 
    }
    deleteProducts = async (id) =>{
        
        try{
        const token = localStorage.getItem('jwt_token')
        const url = `${process.env.REACT_APP_API_URL}/api/products/${id}`;
        const options ={
            method:'DELETE',
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        const response = await fetch(url, options);
        // const data = await response.json();
        if(response.ok){
            this.getProducts();
        }
    } catch(error) {
        this.setState({isloading: apistatuses.failure, errorMsg: error.message})
    }
}

    renderOnfailure = () => (
        <div className="error-container">
            <img src="/error.png" alt="Error" className="error-image" />
            <h1 className="error-heading">{this.state.errorMsg}</h1>
        </div>
    )

    renderOnloading = () => (
        <div className="loading-container">
            <p className="loading-text">Loading...</p>
        </div>
    )

    renderOnsuccess = () => {
        const {productsList} = this.state;
        return (
            <div className="products-container">
                <AdminHeader/>
                <h1 className="products-title">Products</h1>
                
                {/* Table Wrapper for Responsiveness */}
                <div className="table-responsive">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsList.map((product) => (
                                <tr key={product._id} className="table-row">
                                    <td>
                                        <img 
                                            src={product.imageUrl} 
                                            alt={product.name} 
                                            className="table-product-image" 
                                        />
                                    </td>
                                    <td className="product-name">{product.name}</td>
                                    <td className="product-description">{product.description}</td>
                                    <td className="stock">{product.stock}</td>
                                    <td className="product-price">₹ {product.price}</td>
                                    <td className="action-button1">
                                        <button className="edit-button" onClick={() => window.location.replace(`/admin/edit-product/${product._id}`)}>Edit</button>
                                    </td>
                                    <td className="action-button2">
                                        <button className="delete-button" onClick={() => this.deleteProducts(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    renderOnContent = () => {
        const {isloading} = this.state;
        switch(isloading) {
            case apistatuses.loading:
                return this.renderOnloading();
            case apistatuses.success:
                return this.renderOnsuccess();
            case apistatuses.failure:
                return this.renderOnfailure();
            default:
                return null;
        }
    }

    render(){
        return (
            <>
                {this.renderOnContent()}
            </>
        )
    }

}

export default AdminProducts