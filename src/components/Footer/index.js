import React, { Component } from 'react';

import styles from './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <div className={`${styles['Footer']} flex items-end`}>
        &copy; 2018 Ample Hills
      </div>
    );
  }
}

export default Footer;
