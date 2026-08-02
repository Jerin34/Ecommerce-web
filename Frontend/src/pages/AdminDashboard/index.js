import {Component} from 'react'
import './index.css'
import AdminOrders from '../AdminOrders'
import AdminHeader from '../AdminHeader'

const apistatuses = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    loading: 'LOADING',
}
class AdminDashboard extends Component{
    state={
        dashboardData: {},
        apistatus:apistatuses.initial,
        errorMsg:'',
    }
    componentDidMount(){
        this.getDashboardData()
    }
    getDashboardData = async()=>{
        try{
        const jwt_token = localStorage.getItem('jwt_token');
        this.setState({apistatus:apistatuses.loading})
        const url=`${process.env.REACT_APP_API_URL}/api/admin/dashboard`;
        const options = {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${jwt_token}`
            }
        }
        const response = await fetch(url,options);
        const data = await response.json();
        if(response.ok){
            
            this.setState({dashboardData:data,apistatus:apistatuses.success})
        }
        else{
            this.setState({errorMsg:data.message, apistatus:apistatuses.failure})
        }
    }
    catch(err){
        this.setState({errorMsg:err.message,apistatus:apistatuses.failure})
    }
    }
    renderonFailure = () =>(
        <div className="error-container">
            <img src="/error.png" alt="Error" className="error-image" />
            <h1 className="error-heading">{this.state.errorMsg}</h1>
            </div>
    )
    renderOnloading = () =>(
        <div className="loading-container">
            <p className="loading-text">loading....</p>
        </div>
    )
    renderOnsuccess = () =>{
        const { dashboardData } = this.state;
        return(
            <div className="dashboard-container">
                <AdminHeader/>
                <h1 className="dashboard-title">Dashboard</h1>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h2 className="stat-label">Products</h2>
                        <h3 className="stat-value">{dashboardData.totalProducts}</h3>
                    </div>
                    <div className="stat-card">
                        <h2 className="stat-label">Orders</h2>
                        <h3 className="stat-value">{dashboardData.totalOrders}</h3>
                    </div>
                    <div className="stat-card">
                        <h2 className="stat-label">Pending Orders</h2>
                        <h3 className="stat-value">{dashboardData.pendingOrders}</h3>
                    </div>
                    <div className="stat-card dark-card">
                        <h2 className="stat-label">Total Revenue </h2>
                        <h3 className="stat-value text-green">₹ {dashboardData.totalrevenue}</h3>
                        </div>
                </div>
                            <button className="btn-view" onClick={()=>{window.location.replace('/admin/products')}}>View Products here</button>
            <button className="btn-add" onClick={()=>{window.location.replace('/admin/add-product')}}>Add Products here</button>
            </div>
        )
    }
    renderContent = () => {
        const {apistatus} = this.state;
        switch(apistatus){
            case apistatuses.success:
                return this.renderOnsuccess();
            case apistatuses.failure:
                return this.renderonFailure();
            case apistatuses.loading:
                return this.renderOnloading();
            default:
                return null;
        }
    }
    render(){

        return(
            <>
            {
                this.renderContent()
            } 
            <AdminOrders/>
            </>

        )
    }
}
export default AdminDashboard
