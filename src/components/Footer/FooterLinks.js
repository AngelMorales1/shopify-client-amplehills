import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Footer.scss';
import { Button, Image } from 'components/base';

class FooterLnks extends Component {
  render() {
    console.log('///', this.props);
    return (
      <div>
        <div>
          <h2>We would love to talk!</h2>
          <Button label="Contact Us" />
        </div>
        <div>
          <Image
            alt="Decorative arrow icon"
            src="/assets/images/footer-arrow.svg"
            style={{ width: '50px', height: '50px' }}
          />
        </div>
        <div>
          <div>
            <div>
              <Image
                alt="Instagram icon"
                src="/assets/images/sns-link-image-mock.svg"
                style={{ width: '30px', height: '30px' }}
              />
              <a href={this.props.footerLinks.instagramLink} target="_blank">
                Instagram
              </a>
            </div>
            <div>
              <Image
                alt="Instagram icon"
                src="/assets/images/sns-link-image-mock.svg"
                style={{ width: '30px', height: '30px' }}
              />
              <a href={this.props.footerLinks.twitterLink} target="_blank">
                Twitter
              </a>
            </div>
            <div>
              <Image
                alt="Instagram icon"
                src="/assets/images/sns-link-image-mock.svg"
                style={{ width: '30px', height: '30px' }}
              />
              <a href={this.props.footerLinks.facebookLink} target="_blank">
                Facebook
              </a>
            </div>
            {this.props.footerIllustration ? (
              <img src={this.props.footerIllustration.fields.file.url} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default FooterLnks;
