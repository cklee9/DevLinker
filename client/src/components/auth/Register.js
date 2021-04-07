import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
import backgroundImage from '../../img/signInImg4.jpeg';
import Container from '@material-ui/core/Container';

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
    width: '48ch',
    height: '70ch',
  },
  button: {
    height: '6ch',
    width: '48ch',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40ch',
    textAlign: 'center',
  },
  annotation: {
    color: '#B2A6A3',
  },
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false,
    emailErrorText: '',
    passwordErrorText: '',
    emailInputError: false,
    passwordInputError: false,
  });
  const {
    name,
    email,
    password,
    password2,
    showPassword,
    showPassword2,
    emailErrorText,
    passwordErrorText,
    emailInputError,
    passwordInputError,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (checkValidation()) {
      if (password !== password2) {
        setAlert('passwords do not match', 'danger');
      } else {
        register({ name, email, password });
      }
    }
  };
  const handleClickShowPassword = (field, showPassword) => {
    console.log('handleClickShowPassword', [field]);
    setFormData({ ...formData, [field]: !showPassword });
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

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Container maxWidth='xl' disableGutters={true} className={classes.root}>
        <Paper elevation={4} className={classes.paper}>
          <form className={classes.form}>
            <h1>Sign Up</h1>
            <p className={clsx(classes.margin, classes.title)}>
              Create Your Account to Explore Developers All Over the World
            </p>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant='outlined'
              required
            >
              <InputLabel htmlFor='outlined-adornment-email'>Name</InputLabel>
              <OutlinedInput
                id='outlined-adornment-email'
                type='name'
                value={name}
                name='name'
                onChange={onChange}
                labelWidth={50}
              />
            </FormControl>

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
            <small className={clsx(classes.title, classes.annotation)}>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
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
                      onClick={() =>
                        handleClickShowPassword('showPassword', showPassword)
                      }
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
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant='outlined'
              required
            >
              <InputLabel htmlFor='outlined-adornment-password'>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword2 ? 'text' : 'password'}
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() =>
                        handleClickShowPassword('showPassword2', showPassword2)
                      }
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword2 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={80}
              />
            </FormControl>
            <Button
              type='primary'
              className={clsx(classes.margin, classes.button)}
              onClick={onSubmit}
            >
              Register
            </Button>

            <p className='my-1'>
              Already have an account? <Link to='/login'>Sign In</Link>
            </p>
          </form>
        </Paper>
      </Container>

      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
