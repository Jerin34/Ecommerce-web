import { Component } from 'react';
import { showToast } from '../../components/Toast';
import './index.css';
class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errMsg: '',
    showPassword: false,
    loading: false,
  };

  onChangeName = (e) => this.setState({ name: e.target.value });
  onChangeEmail = (e) => this.setState({ email: e.target.value });
  onChangePassword = (e) => this.setState({ password: e.target.value });
  onChangeConfirmPassword = (e) => this.setState({ confirmPassword: e.target.value });
  onChangeShowPassword = () => this.setState((prev) => ({ showPassword: !prev.showPassword }));

  onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    if (!name || !email || !password || !confirmPassword) {
      this.setState({ errMsg: '⚠️ All fields must be filled' });
      showToast('All fields must be filled', 'error');
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ errMsg: '⚠️ Passwords do not match' });
      showToast('Passwords do not match', 'error');
      return;
    }

    this.setState({ loading: true, errMsg: '' });

    const userDetails = { name, email, password };
    const url = `${process.env.REACT_APP_API_URL}/api/auth/register`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        this.onSubmitSuccess(data);
      } else {
        this.onSubmitFailure(data.message || 'Registration failed');
      }
    } catch {
      this.setState({ errMsg: '⚠️ Something went wrong', loading: false });
      showToast('Something went wrong', 'error');
    }
  };
LoginNavigtor = () =>{
    window.location.replace('/login')
}
  onSubmitSuccess = (data) => {
    showToast('Registration successful.Please log in.', 'success');
    window.location.replace('/login');
  };

  onSubmitFailure = (errMsg) => {
    this.setState({ errMsg, loading: false });
    showToast(errMsg, 'error');
  };

  render() {
    const { name, email, password, confirmPassword, errMsg, showPassword, loading } = this.state;

    return (
      <div className="register-page">
        <div className="register-card">
          <div className="brand-panel">
            <div className="brand-badge">✨</div>
            <h2>Create your account</h2>
            <p>Join our ecommerce store for exclusive offers, faster checkout, and personalized recommendations.</p>
          </div>

          <div className="form-panel">
            <h1 className="heading">Register here</h1>
            <form className="form" onSubmit={this.onSubmit}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" value={name} onChange={this.onChangeName} />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" value={email} onChange={this.onChangeEmail} />

              <label htmlFor="password">Password</label>
              <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Enter your password" value={password} onChange={this.onChangePassword} />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type={showPassword ? 'text' : 'password'} id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={this.onChangeConfirmPassword} />

              <div className="checkbox-container">
                <input type="checkbox" id="showPassword" checked={showPassword} onChange={this.onChangeShowPassword} />
                <label htmlFor="showPassword">Show Password</label>
              </div>

              <button className="register-btn" type="submit" disabled={loading}>
                {loading ? <span className="spinner"></span> : 'Register'}
              </button>

              {errMsg && <p className="error-text">{errMsg}</p>}

              <p className="switch-text">
                Already have an account?
                <button type="button" className="login-link-btn" onClick={this.LoginNavigtor}>Login here</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
