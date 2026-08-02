import {Component} from 'react';
import { showToast } from '../../components/Toast';
import './index.css';
class Login extends Component{
    state={
        email:'',
        password:'',
        showPassword:false,
        errorMsg:'',
    }
    onChangeEmail = event=>{
        this.setState({
            email:event.target.value
        })
    }
    onChangePassword = event=>{
        this.setState({
            password:event.target.value
        })
    }

    onToggleShowPassword = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }))
    }
    onSubmitSuccess = (token,role) => {
        localStorage.setItem('jwt_token',token)
        localStorage.setItem('role',role)
        showToast('Login successful', 'success');
        if(role === 'admin'){
            window.location.replace('/admin/dashboard')
        }else{
        window.location.replace('/products')
        }
        }
    onSubmitFailure = errorMsg => {
        this.setState({
            errorMsg
        })
        showToast(errorMsg, 'error');
    }
    onSubmit =async event =>{
        event.preventDefault();
        const {email,password} = this.state;
        if(!email || !password){
            this.onSubmitFailure('All fields must be filled')
            return;
        }
        const userDetails = {email,password};
        const options = {
            method:'POST',
            body:JSON.stringify(userDetails),
            headers:{
                'Content-Type':'application/json'
            }
        }
        const url = `${process.env.REACT_APP_API_URL}/api/auth/login`
        const response = await fetch(url,options);
        const data = await response.json();
        if(response.ok){
            this.onSubmitSuccess(data.token,data.role)
        }
        else{
            this.onSubmitFailure(data.message)
        }
    }
    RegistrationNavigator = () =>{
        window.location.replace('/register')
    }
    render(){
        const {email,password,errorMsg,showPassword} = this.state
        return(
            <div className='login-page'>
                <div className='login-card'>
                    <div className='brand-panel'>
                        <div className='brand-badge'>🛍️</div>
                        <h2>Welcome back</h2>
                        <p>Sign in to continue exploring fresh deals and your favorite products.</p>
                    </div>

                    <div className='form-panel'>
                        <h1 className='heading'>Login to your account</h1>
                        <form className='form' onSubmit={this.onSubmit}>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                placeholder='Enter your email'
                                value={email}
                                onChange={this.onChangeEmail}
                            />

                            <label htmlFor='password'>Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                placeholder='Enter your password'
                                value={password}
                                onChange={this.onChangePassword}
                            />

                            <label className='show-password-label' htmlFor='showPassword'>
                                <input
                                    type='checkbox'
                                    id='showPassword'
                                    checked={showPassword}
                                    onChange={this.onToggleShowPassword}
                                />
                                Show password
                            </label>

                            <button className='btn' type='submit'>
                                Login
                            </button>

                            {errorMsg && <p className='error-text'>{errorMsg}</p>}
                            <button type="btn" className="registerbtn" onClick={this.RegistrationNavigator}>Register here</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;