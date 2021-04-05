import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import BallotIcon from '@material-ui/icons/Ballot';

const useStyles = makeStyles({
  root: {
    marginRight: 25,
    width: 250,
    height: 50,
    backgroundColor: '#343a40',
    '&$selected': {
      color: '#17a2b8',
    },
  },
  // need to figure color issue
  selected: { selected: { color: '#17a2b8' } },
});

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const authLinks = (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to='/profiles'
        label='Developers'
        icon={<PeopleAltIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/posts'
        label='Posts'
        icon={<SpeakerNotesIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/dashboard'
        label='Dashboard'
        icon={<BallotIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/login'
        onClick={logout}
        label='Logout'
        icon={<ExitToAppIcon />}
      />
    </BottomNavigation>
  );

  const guestLinks = (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to='/profiles'
        label='Developers'
        icon={<PeopleAltIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/register'
        label='Register'
        icon={<HowToRegIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/login'
        label='Login'
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );

  return (
    <>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code'></i> DevConnector
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
