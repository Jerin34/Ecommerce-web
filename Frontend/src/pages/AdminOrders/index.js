import {Component} from 'react'
import { showToast } from '../../components/Toast';
import './index.css'
const apistatuses = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    loading: 'LOADING',
}
class AdminOrders extends Component{
    state={
        orderList: [],
        isloading: apistatuses.initial,
        errorMsg: '',
    }
    componentDidMount(){
        this.getOrders()
    }
    getOrders = async() =>{
        this.setState({isloading: apistatuses.loading});
        try{
        const token = localStorage.getItem('jwt_token')
        const url = "http://localhost:5000/api/admin/orders";
        const options ={
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url,options);
        const data =  await response.json();
        if(response.ok){
            this.setState({orderList:data.orders, isloading: apistatuses.success});
        }
        else{
            this.setState({errorMsg:data.message, isloading: apistatuses.failure});
        }
    }
    catch(error){
        this.setState({errorMsg: error.message, isloading: apistatuses.failure});
    }}
    renderOnfailure = () => (
        <div className="error-container">
            <img src="/error.png" alt="Error" className="error-image" />
            <h1 className="error-heading">{this.state.errorMsg}</h1>
        </div>
    )
    renderonLoading = () =>(
        <div className="loader-container">
            <img src="/loader.gif" alt="Loader" className="loader-image" />
        </div>
    )
    renderOnsuccess = () =>{
        const {orderList} = this.state;
        return(
           <div className="orders-container">
  <h1 className="orders-title">Orders</h1>
  <div className="table-responsive">
    <table className="orders-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Customer</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orderList.map((order) =>
          order.items.map((item) => (
            <tr key={item._id} className="table-row">
              <td className="order-product">
                {item.product ? item.product.name : "Unknown Product"}
              </td>
              <td className="order-customer">{order.user.name}</td>
              <td className="order-quantity">{item.quantity}</td>
              <td className="order-price">₹ {order.totalPrice}</td>
              <td>
                <select
                  className="order-status-select"
                  value={order.status}
                  onChange={(e) => this.updateStatus(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

        )
    }
updateStatus = async (id,status) =>{
    try{
    const token = localStorage.getItem('jwt_token');
    const url = `http://localhost:5000/api/admin/orders/${id}`;
    const options = {
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify({status})
    }
    const response = await fetch(url,options);
    const data = await response.json();
    if(response.ok){
        showToast(data.message, 'success');
        this.getOrders();
    }
    else{
        showToast(data.message, 'error');
    }
}
catch(err){
    this.setState({errorMsg:err.message});
}
}
    renderView = () => {
        const {isloading} = this.state;
        switch(isloading){
            case apistatuses.loading:
                return this.renderonLoading();
            case apistatuses.success:
                return this.renderOnsuccess();
            case apistatuses.failure:
                return this.renderOnfailure();
            default:
                return null;
        }
    }
    render(){
        return(
            <div>
                {
                    this.renderView()
                }
                </div>
        )
    }
}
export default AdminOrders