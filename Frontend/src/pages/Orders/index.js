import { Component } from 'react';
import Orderitem from '../Orderitem';
import { showToast } from '../../components/Toast';
import Header from '../Header'
import './index.css';

const apistatuses = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    loading: 'LOADING',
    error: 'ERROR'
};

class Orders extends Component {
    state = {
        orderList: [],
        isloading: apistatuses.initial,
        errorMsg: '',
    };

    componentDidMount() {
        this.getOrderList();
    }

    getOrderList = async () => {
        this.setState({ isloading: apistatuses.loading });
        const jwt_token = localStorage.getItem('jwt_token');
        const url = "http://localhost:5000/api/orders";
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${jwt_token}`
            }
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                this.setState({ orderList: data.orders, isloading: apistatuses.success });
            } else {
                this.setState({ errorMsg: data.message, isloading: apistatuses.error });
            }
        } catch (err) {
            this.setState({ errorMsg: err.message, isloading: apistatuses.error });
        }
    };

    onrenderFailuer = () => (
        <div className="orders-failure">
            <img src="/error.png" alt="Error" className="error-image" />
            <h1 className="error-message">{this.state.errorMsg}</h1>
        </div>
    );

    onrenderLoading = () => (
        <div className="orders-loading">
            <h1 className="loading-text">Loading...</h1>
        </div>
    );

    onrenderSuccess = () => {
        const { orderList } = this.state;
        return (
            <div className="orders-success">
                <Header />
                <h1 className="orders-title">Your Orders</h1>
                <ul className="orders-list">
                    {orderList.map(each => (
                        <li key={each._id} className="orders-list-item">
                            <Orderitem orderDetails={each} cancelOrder={this.cancelOrder} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    onrenderView = () => {
        const { isloading } = this.state;
        switch (isloading) {
            case apistatuses.loading:
                return this.onrenderLoading();
            case apistatuses.success:
                return this.onrenderSuccess();
            case apistatuses.error:
                return this.onrenderFailuer();
            default:
                return null;
        }
    };
cancelOrder = async id => {
    const  token  = localStorage.getItem('jwt_token');
    const url = `http://localhost:5000/api/orders/${id}/cancel`;
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if(response.ok){
        showToast(data.message, 'success');
        this.getOrderList();
    }else{
        showToast(data.message, 'error')
    }
  
}
    render() {
        return (
            <div className="orders-container">
                {this.onrenderView()}
            </div>
        );
    }
}

export default Orders;
