import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import backgroundImage from '../../img/signInImg4.jpeg';
import Container from '@material-ui/core/Container';

// for material-ui styling
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '700px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '42ch',
  },
  paper: {
    width: '50ch',
    height: '48ch',
  },

  button: {
    height: '6ch',
    width: '48ch',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
    emailErrorText: '',
    passwordErrorText: '',
    emailInputError: false,
    passwordInputError: false,
  });
  const {
    email,
    password,
    showPassword,
    emailErrorText,
    passwordErrorText,
    emailInputError,
    passwordInputError,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (checkValidation()) {
      login(email, password);
    }
  };
  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !showPassword });
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const checkValidation = () => {
    const emailRegex = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    let emailInputError,
      passwordInputError = false;
    let emailErrorText,
      passwordErrorText = '';
    if (email.length === 0) {
      emailInputError = true;
      emailErrorText = 'email is required';
    } else if (!emailRegex.test(email)) {
      emailInputError = true;
      emailErrorText = 'please provide a valid email';
    } else {
      emailInputError = false;
      emailErrorText = '';
    }

    if (password.length === 0) {
      passwordInputError = true;
      passwordErrorText = 'password is required';
    } else if (password.length < 6) {
      passwordInputError = true;
      passwordErrorText = 'minimum length of password is 6';
    } else {
      passwordInputError = false;
      passwordErrorText = '';
    }
    setFormData({
      ...formData,
      emailInputError,
      passwordInputError,
      emailErrorText,
      passwordErrorText,
    });
    return !emailInputError && !passwordInputError;
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Container maxWidth='xl' disableGutters={true} className={classes.root}>
        <Paper elevation={4} className={classes.paper}>
          <form className={classes.form}>
            <h1>Sign In</h1>
            <h3 className={clsx(classes.margin, classes.title)}>
              <PersonIcon />
              Sign Into Your Account
            </h3>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant='outlined'
              error={emailInputError}
              required
            >
              <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
              <OutlinedInput
                id='outlined-adornment-email'
                type='email'
                value={email}
                name='email'
                onChange={onChange}
                labelWidth={50}
              />
              <FormHelperText id='my-helper-text' error={emailInputError}>
                {emailErrorText}
              </FormHelperText>
            </FormControl>

            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant='outlined'
              error={passwordInputError}
              required
            >
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={80}
              />
              <FormHelperText id='my-helper-text' error={passwordInputError}>
                {passwordErrorText}
              </FormHelperText>
            </FormControl>
            <Button
              type='primary'
              className={clsx(classes.margin, classes.button)}
              onClick={onSubmit}
            >
              Login
            </Button>

            <p className='my-1'>
              Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
