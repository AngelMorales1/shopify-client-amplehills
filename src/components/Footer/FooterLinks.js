import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Footer.scss';
import { Button, Image } from 'components/base';

class FooterLinks extends Component {
  render() {
    return (
      <div
        className={cx('m4 flex flex-column', styles['FooterLinks__container'])}
      >
        <h2 className="title-text text-white">We would love to talk!</h2>
        <div className="my3 flex">
          <Button label="Contact Us" color="madison-blue" />
          <Image
            alt="Decorative arrow icon"
            src="/assets/images/arrow-left-down.svg"
            className={cx('arrow mx3', styles['Footer__arrow'])}
          />
        </div>
        <div className={cx(styles['sns-links__container'])}>
          <div className="my3 flex items-center">
            <Image
              alt="Instagram icon"
              src="/assets/images/sns-link-image-mock.svg"
              style={{ width: '30px', height: '30px' }}
            />
            <a
              href={this.props.footerLinks.instagramLink}
              target="_blank"
              className="bold text-white text-decoration-none ml3"
            >
              Instagram
            </a>
          </div>
          <div className="my3 flex items-center">
            <Image
              alt="Instagram icon"
              src="/assets/images/sns-link-image-mock.svg"
              style={{ width: '30px', height: '30px' }}
            />
            <a
              href={this.props.footerLinks.twitterLink}
              target="_blank"
              className="bold text-white text-decoration-none ml3"
            >
              Twitter
            </a>
          </div>
          <div className="my3 flex items-center">
            <Image
              alt="Instagram icon"
              src="/assets/images/sns-link-image-mock.svg"
              style={{ width: '30px', height: '30px' }}
            />
            <a
              href={this.props.footerLinks.facebookLink}
              target="_blank"
              className="bold text-white text-decoration-none ml3"
            >
              Facebook
            </a>
          </div>
        </div>
        {this.props.footerIllustration ? (
          <Image
            src={this.props.footerIllustration.fields.file.url}
            className={cx('self-end', styles['illustration'])}
          />
        ) : null}
      </div>
    );
  }
}

export default FooterLinks;
