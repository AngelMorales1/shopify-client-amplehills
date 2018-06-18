import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Footer.scss';
import { Button, Image } from 'components/base';

class FooterLinks extends Component {
  render() {
    return (
      <div className="m4 col-4">
        <h2 className="title bold text-white">We would love to talk!</h2>
        <div className="my3 flex">
          <Button label="Contact Us" color="white-madison-blue" />
          <Image
            alt="Decorative arrow icon"
            src="/assets/images/arrow-left-down.svg"
            className={cx('arrow mx3', styles['Footer__arrow'])}
          />
        </div>
        <div className="mt4">
          <div className="my3 flex items-center">
            <Image
              alt="Instagram icon"
              src="/assets/images/bubble-icon.svg"
              className="icon"
            />
            <a
              href={this.props.footerLinks.instagramLink}
              target="_blank"
              rel="noopener"
              className="bold text-white text-decoration-none ml3"
            >
              Instagram
            </a>
          </div>
          <div className="my3 flex items-center">
            <Image
              alt="Instagram icon"
              src="/assets/images/bubble-icon.svg"
              className="icon"
            />
            <a
              href={this.props.footerLinks.twitterLink}
              target="_blank"
              rel="noopener"
              className="bold text-white text-decoration-none ml3"
            >
              Twitter
            </a>
          </div>
          <div className="my3 flex items-center">
            <Image
              alt="Instagram icon"
              src="/assets/images/bubble-icon.svg"
              className="icon"
            />
            <a
              href={this.props.footerLinks.facebookLink}
              target="_blank"
              rel="noopener"
              className="bold text-white text-decoration-none ml3"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterLinks;
