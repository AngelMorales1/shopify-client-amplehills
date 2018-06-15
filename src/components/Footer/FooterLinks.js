import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Footer.scss';
import { Button } from 'components/base';

class FooterLnks extends Component {
  render() {
    return (
      <div>
        <h2>We would love to talk!</h2>
        <Button label="Contact Us" />
        <div>
          <div>
            <div>
              <p>Instagram</p>
            </div>
            <div>
              <p>Twitter</p>
            </div>
            <div>
              <p>Facebook</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterLnks;
