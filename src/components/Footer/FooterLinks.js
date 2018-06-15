import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Footer.scss';
import { Button, Image } from 'components/base';

class FooterLnks extends Component {
  render() {
    return (
      <div className="p3">
        <h2 className="title-text text-white">We would love to talk!</h2>
        <div className="my3">
          <Button label="Contact Us" />
          <Image
            alt="Decorative arrow icon"
            src="/assets/images/footer-arrow.svg"
            className={cx('ml3', styles['arrow'])}
          />
        </div>
        <div>
          <div className="my4">
            <div className="my2 flex items-center">
              <Image
                alt="Instagram icon"
                src="/assets/images/sns-link-image-mock.svg"
                style={{ width: '30px', height: '30px' }}
              />
              <a
                href={this.props.footerLinks.instagramLink}
                target="_blank"
                className="Footer__link-text text-white text-decoration-none ml3"
              >
                Instagram
              </a>
            </div>
            <div className="my2 flex items-center">
              <Image
                alt="Instagram icon"
                src="/assets/images/sns-link-image-mock.svg"
                style={{ width: '30px', height: '30px' }}
              />
              <a
                href={this.props.footerLinks.twitterLink}
                target="_blank"
                className="Footer__link-text text-white text-decoration-none ml3"
              >
                Twitter
              </a>
            </div>
            <div className="my2 flex items-center">
              <Image
                alt="Instagram icon"
                src="/assets/images/sns-link-image-mock.svg"
                style={{ width: '30px', height: '30px' }}
              />
              <a
                href={this.props.footerLinks.facebookLink}
                target="_blank"
                className="Footer__link-text text-white text-decoration-none ml3"
              >
                Facebook
              </a>
            </div>
          </div>
          {this.props.footerIllustration ? (
            <Image
              src={this.props.footerIllustration.fields.file.url}
              className={cx(styles['illustration'])}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default FooterLnks;
