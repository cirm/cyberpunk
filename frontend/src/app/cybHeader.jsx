import React, { PropTypes } from 'react';
import connect from 'react-redux/lib/connect/connect';
import Link from 'react-router/lib/Link';
import PureComponent from '../lib/PureComponent';
import { logoutUser, displayLogin } from '../authentication/cybAuthActionCreators';
import styles from './cybHeader.styl';

const home = <Link to="/" />;

export class Header extends PureComponent {
  constructor() {
    super();
    this.triggerSignIn = this.triggerSignIn.bind(this);
  }

  getDisplay() {
    return !!this.props.display;
  }

  triggerLogout() {
    this.props.dispatch(logoutUser());
  }

  triggerSignIn() {
    this.props.dispatch(displayLogin());
  }

  render() {
    return (
      <div className={styles.body} >
        <p>The Deep Net!</p>
        <button className={styles.loginButton} onClick={this.triggerSignIn} >Jack in?</button>
        {/*       <AppBar
         title="QE testing!"
         iconElementLeft={
         <IconButton containerElement={home} >
         <DonutSmall />
         </IconButton>}
         iconElementRight={
         this.getDisplay() ?
         <div>
         <IconMenu
         iconButtonElement={
         <FlatButton label={this.props.display} style={{ margin: 5 }} />}
         targetOrigin={{ horizontal: 'right', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
         >
         <MenuItem primaryText="Home" containerElement={home} />
         <MenuItem primaryText="Profile" containerElement={profile} />
         <Divider />
         <MenuItem primaryText="Jack out" onTouchTap={() => this.triggerLogout()} />
         </IconMenu>
         </div>
         : <Button onTouchTap={() => this.triggerSignIn()} >Wanna try?</Button>
         }
         />*/}
      </div>);
  }
}

Header.propTypes = {
  profile: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    display: state.getIn(['profile', 'username']),
  };
}

export const HeaderContainer = connect(mapStateToProps)(Header);
