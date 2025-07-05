import React, { useState, useEffect, useContext } from 'react';
import imageURL from '../../images/VoiceCanvas.jpg'; // Adjust the path according to your structure
import { TextField, Box, Button, Typography, styled, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
  width: 420px;
  margin: auto;
  box-shadow: 7px 4px 7px 4px rgb(0 0 0 / 0.7);
`;

const Image = styled('img')({
  width: 300,
  margin: 'auto',
  display: 'flex',
  padding: '50px'
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div, & > button, & > p {
    margin-top: 25px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #FB641B;
  color: #fff;
  height: 48px;
  border-radius: 5px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: rgb(173, 216, 230);
  color: #2874f0;
  height: 48px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Error = styled(Typography)`
  font-size: 12px;
  color: #ff6161;
  line-height: 1;
  margin-top: 10px;
  font-weight: 600;
  text-align: center;
`;

const Success = styled(Typography)`
  font-size: 12px;
  color: #28a745;
  line-height: 1;
  margin-top: 10px;
  font-weight: 600;
  text-align: center;
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

const loginInitialValues = {
  username: '',
  password: ''
};

const signupInitialValues = {
  name: '',
  username: '',
  password: '',
};

const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState('');
  const [success, showSuccess] = useState('');
  const [account, toggleAccount] = useState('login');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  useEffect(() => {
    showError('');
    showSuccess('');
  }, [login, signup]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateSignup = () => {
    const { name, username, password } = signup;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!name || !username || !password) {
      showError('All fields are required');
      return false;
    }
    if (!validateName(name)) {
      showError('Name must contain only alphabets and spaces');
      return false;
    }
    if (!validateEmail(username)) {
      showError('Please enter a valid email address');
      return false;
    }
    if (username.length < 10) {
      showError('Username must be at least 10 characters long');
      return false;
    }
    if (!passwordRegex.test(password)) {
      showError('Password must be at least 6 characters long, include at least one uppercase letter, one number, and one special character');
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    const { username, password } = login;

    if (!username || !password) {
      showError('All fields are required');
      return false;
    }
    if (!validateEmail(username)) {
      showError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const loginUser = async () => {
    if (validateLogin()) {
      try {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
          showError('');

          sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
          sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
          setAccount({ name: response.data.name, username: response.data.username });

          isUserAuthenticated(true);
          setLogin(loginInitialValues);
          navigate('/');
        } else {
          showError('Invalid credentials, please check username or password');
        }
      } catch (error) {
        showError('Connection error,please check username or password & try again later');
      }
    }
  };

  const signupUser = async () => {
    if (validateSignup()) {
      try {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
          showError('');
          showSuccess('Signed up successfully! Please login.');
          setSignup(signupInitialValues);
          setTimeout(() => {
            showSuccess('');
            toggleAccount('login');
          }, 2000);
        } else {
          showError('Something went wrong! please try again later');
        }
      } catch (error) {
        showError('Connection error, please try again later');
      }
    }
  };

  const toggleSignup = () => {
    account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" style={{ verticalAlign: 'top' }} />
        {account === 'login' ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={onValueChange}
              name='username'
              label='Enter Email'
            />
            <TextField
              variant="standard"
              value={login.password}
              onChange={onValueChange}
              name='password'
              label='Enter Password'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={loginUser}>
              Login
            </LoginButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <SignupButton onClick={toggleSignup} style={{ marginBottom: 50 }}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={onInputChange}
              name='name'
              label='Enter Name'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              variant="standard"
              onChange={onInputChange}
              name='username'
              label='Enter Email'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              variant="standard"
              onChange={onInputChange}
              name='password'
              label='Enter Password'
              InputLabelProps={{
                shrink: true,
              }}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {error && <Error>{error}</Error>}
            {success && <Success>{success}</Success>}

            <SignupButton onClick={signupUser}>
              Signup
            </SignupButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <LoginButton variant="contained" onClick={toggleSignup}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
