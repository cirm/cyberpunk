import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../generalComponents/Button';
import { logoutUser, displayLogin } from '../authentication/cybAuthActionCreators';
import styles from './cybHeader.styl';


export class Header extends React.PureComponent {
  constructor() {
    super();
    this.triggerSignIn = this.triggerSignIn.bind(this);
    this.triggerLogout = this.triggerLogout.bind(this);
  }

  triggerLogout() {
    this.props.dispatch(logoutUser({ username: this.props.display }));
  }

  triggerSignIn() {
    this.props.dispatch(displayLogin());
  }

  render() {
    return (
      <div className={styles.header} >
        <p className={styles.titleText} >The Deep Net!</p>

        {this.props.display && this.props.urlPath == '/' ? <Button> <Link to="/grid">Grid</Link> </Button> :
         this.props.urlPath != '/' ? <Button> <Link to="/">Chat</Link> </Button>: null}
         {this.props.display ? <Button onClick={this.triggerLogout} >Log Out?</Button> :
           <Button onClick={this.triggerSignIn} >Jack in?</Button>}
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

Header.defaultProps = {
  display: '',
};

Header.propTypes = {
  display: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    display: state.getIn(['profile', 'username']),
    urlPath: state.get('router').location.pathname,
  };
}

export const HeaderContainer = connect(
  mapStateToProps,
)(Header);
