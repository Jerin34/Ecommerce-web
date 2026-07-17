import { Component } from 'react';
// 1. Import the specific loader you want to use
import { TailSpin } from 'react-loader-spinner'; 
import { showToast } from '../../components/Toast';
import Cartitem from '../Cartitem';
import './index.css';
const apistatuses = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    error: 'ERROR',
}
class Cart extends Component {
  
    state = {
        cartList: [],
        isloading: apistatuses.initial,
        errorMsg: '',
    }

  removeItem = (cartItemId) =>{
   
        this.setState(prevstate =>({
            cartList:prevstate.cartList.filter(item => item._id !== cartItemId)
        }))
    }
    componentDidMount() {
        this.fetchCarts();
    }

    fetchCarts = async () => {
        const jwt_token = localStorage.getItem('jwt_token');
        if (!jwt_token) {
            this.setState({ isloading: apistatuses.error, errorMsg: 'No User Found' })
            return;
        }
        
        this.setState({ 
            isloading: apistatuses.loading
        })
        
        const url = "http://localhost:5000/api/cart";
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt_token}`
            }
        }
        
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            
            if (response.ok) {
                this.setState({
                    cartList: data.cartItem,
                    isloading: apistatuses.success
                })
            } else {
                this.setState({
                    isloading: apistatuses.error,
                    errorMsg: data.message
                })
            }
        } catch (error) {
            this.setState({
                isloading: apistatuses.error,
                errorMsg: "Failed to fetch data"
            })
        }
    }
    PlaceOrder = async () =>{
        try{
        const jwt_token = localStorage.getItem('jwt_token');
        const url = 'http://localhost:5000/api/orders';
        const options ={
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${jwt_token}`
            }            
        }
            const response = await fetch(url,options);
            const data = await response.json();
            if(response.ok){
                showToast(data.message, 'success');
                window.location.replace('/Orders');
                this.setState({
                    cartList:[]
                })
            }
            else{
                showToast(data.message, 'error')
            }
        }
        catch(error){
            console.log(`Error placing order: ${error.message}`)
        }

    }

    onrenderFaliure = () => (
        <div>
            <img src="/error.png" alt="Error" />
            <h1>{this.state.errorMsg}</h1>
        </div>
    )

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
    )

    orenderSucces = () => {
        const { cartList } = this.state;
        const total = cartList.reduce((acc,curr) =>{
            return acc + curr.quantity*curr.product.price
        },0)
        return (
            <div>
                <ul>
                {cartList.map((cartItem) => (
                    <Cartitem key={cartItem._id} cartItem={cartItem} removeCartItem={this.removeItem} refreshCarts={this.fetchCarts}/>
                ))}
                </ul>
                <h4 className="total">Total: {total}</h4>
                <button className="order-btn" onClick={this.PlaceOrder}> Order Now </button>
            </div>
        )
    }

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
    }

    render() {
        return (
            <div>
                {this.onrenderContent()}
            </div>
        )
    }
}

export default Cart;