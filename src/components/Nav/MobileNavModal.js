import React from 'react';
import PropTypes from 'prop-types';

import { Button, Image } from 'components/base';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import get from 'utils/get';
import styles from './MobileNavModal.scss';

const MobileNavModal = props => {
  const classes = cx(
    'p3 fixed-cover bg-white-wash flex flex-column transition',
    styles['MobileNavModal'],
    {
      [styles['MobileNavModal--active']]: props.isNavModalOpen
    }
  );

  return (
    <div className={classes}>
      <div onClick={props.closeMobileNavModal} className="flex mb3">
        <Button className="mr2" variant="style-none">
          <Image
            className="col-9"
            alt="close icon"
            src="/assets/images/icon-close.svg"
          />
        </Button>
        <NavLink exact to="/search">
          <Image alt="search icon" src="/assets/images/icon-search-peach.svg" />
        </NavLink>
      </div>
      <div
        onClick={props.closeMobileNavModal}
        className="flex flex-column items-start ml3"
      >
        <div className="mb2 link-text-mobile">Locations</div>
        <NavLink exact to="/flavors" className="mb2 link-text-mobile">
          Flavors
        </NavLink>
        <NavLink exact to="/classes-socials" className="mb2 link-text-mobile">
          Classes
        </NavLink>
        <NavLink exact to="/parties" className="mb2 link-text-mobile">
          Parties
        </NavLink>
        <NavLink exact to="/events" className="mb2 link-text-mobile">
          Events
        </NavLink>
        <NavLink exact to="/ourstory" className="mb2 link-text-mobile">
          Our Story
        </NavLink>
        <NavLink exact to="/contact" className="mb3 link-text-mobile">
          Contact Us
        </NavLink>
        <Button to="/products" label="Shop Online" color="peach" />
      </div>
    </div>
  );
};

MobileNavModal.propTypes = {};

MobileNavModal.defaultProps = {};
export default MobileNavModal;
