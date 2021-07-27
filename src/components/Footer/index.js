import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import Global from 'constants/Global';
import { Link } from 'react-router-dom';

import { Image, Button } from 'components/base';
import { NavLink } from 'react-router-dom';

import styles from './Footer.scss';

class Footer extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.small.label
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  updateWindow = () => {
    const { small, large } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= large.lowerbound ? small.label : large.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  render() {
    const { footerLinks, footerIcons, footerIllustration } = this.props;
    const { currentBreakpoint } = this.state;

    return (
      <div
        className={cx(
          'py4 bg-peach flex items-center justify-center',
          styles['Footer']
        )}
      >
        <div
          className={cx(
            styles['Footer__content'],
            'relative flex container-width col-12'
          )}
        >
          <div
            className={cx(
              styles['Footer__contact-us-container'],
              'flex flex-column col-12 md-col-5 pt2'
            )}
          >
            <h2 className="text-white block-headline">
              Need help? Wanna chat? We would love to talk!
            </h2>
            <div className="inline-flex">
              <Button
                exact
                to="/contact"
                variant={
                  currentBreakpoint === 'small' ? 'primary-small' : 'primary'
                }
                label="Contact Us"
                color="white-peach"
                shadow={true}
                className={cx(styles['Footer__button'], 'nowrap inline-flex')}
              />
              <Image
                alt="Decorative left down arrow icon"
                src="/assets/images/arrow-left-down.svg"
                className={cx(
                  'arrow mx3 medium-down-display-none xs-hide sm-hide',
                  styles['Footer__arrow']
                )}
              />
            </div>
          </div>
          <div
            className={cx(
              styles['Footer__link-container'],
              'flex flex-column justify-start col-12 md-col-7'
            )}
          >
            <div
              className={cx(
                styles['Footer__link-container-inner'],
                'col-12 flex flex-row mb4'
              )}
            >
              <div
                className={cx(
                  styles['Footer__link-column'],
                  'flex flex-column mr4 pr2 mt1'
                )}
              >
                <Link
                  to="/news"
                  className="mb3 mt1 flex items-center bold text-white text-decoration-none"
                >
                  <span className={cx(styles['Footer__link'])}>News</span>
                </Link>
                <Link
                  to="/press"
                  className="mb3 mt1 flex items-center bold text-white text-decoration-none"
                >
                  <span className={cx(styles['Footer__link'])}>Press</span>
                </Link>
                <Link
                  to="/faq"
                  className="mb3 mt1 flex items-center bold text-white text-decoration-none"
                >
                  <span className={cx(styles['Footer__link'])}>FAQ</span>
                </Link>
                <Link
                  to="/jobs"
                  className="mb3 mt1 flex items-center bold text-white text-decoration-none"
                >
                  <span className={cx(styles['Footer__link'])}>Jobs</span>
                </Link>
              </div>
              <div
                className={cx(
                  styles['Footer__link-column'],
                  'flex flex-column mr4 mt1'
                )}
              >
                <Link
                  to="/wholesale"
                  className="mb3 mt1 flex items-center bold text-white text-decoration-none"
                >
                  <span className={cx(styles['Footer__link'])}>Wholesale</span>
                </Link>
                <Link
                  to="/catering"
                  className="mb3 mt1 flex items-center bold text-white text-decoration-none"
                >
                  <span className={cx(styles['Footer__link'])}>Catering</span>
                </Link>
                <Link
                  to="/events"
                  className="mb3 mt1 flex items-center bold text-white text-decoration-none"
                >
                  <span className={cx(styles['Footer__link'])}>Events</span>
                </Link>
                <Link
                  to="/parties"
                  className="mb3 mt1 flex items-center bold text-white text-decoration-none"
                >
                  <span className={cx(styles['Footer__link'])}>
                    Parties & Rentals
                  </span>
                </Link>
              </div>
              <div className={cx(styles['Footer__social-links'], 'mr4 pr2')}>
                <a
                  href={get(footerLinks, 'instagramLink', '')}
                  target="_blank"
                  rel="noopener"
                  className={cx(
                    styles['Footer__social-link'],
                    'mt1 mb3 flex items-center bold text-white text-decoration-none'
                  )}
                >
                  <Image
                    alt="Instagram icon"
                    src={contentfulImgUtil(
                      get(footerIcons, 'instagramIcon.fields.file.url', ''),
                      '200',
                      'png'
                    )}
                    className="icon mr3"
                  />
                  <span className={cx(styles['Footer__link'])}>Instagram</span>
                </a>
                <a
                  href={get(footerLinks, 'twitterLink', '')}
                  target="_blank"
                  rel="noopener"
                  className={cx(
                    styles['Footer__social-link'],
                    'mt1 mb3 flex items-center bold text-white text-decoration-none'
                  )}
                >
                  <Image
                    alt="Twitter icon"
                    src={contentfulImgUtil(
                      get(footerIcons, 'twitterIcon.fields.file.url', ''),
                      '200',
                      'png'
                    )}
                    className="icon mr3"
                  />
                  <span className={cx(styles['Footer__link'])}>Twitter</span>
                </a>
                <a
                  href={get(footerLinks, 'facebookLink', '')}
                  target="_blank"
                  rel="noopener"
                  className={cx(
                    styles['Footer__social-link'],
                    'mt1 mb3 flex items-center bold text-white text-decoration-none'
                  )}
                >
                  <Image
                    alt="Facebook icon"
                    src={contentfulImgUtil(
                      get(footerIcons, 'facebookIcon.fields.file.url', ''),
                      '200',
                      'png'
                    )}
                    className="icon mr3"
                  />
                  <span className={cx(styles['Footer__link'])}>Facebook</span>
                </a>
              </div>
            </div>
            <span
              className={cx(
                styles['Footer__copy-rights'],
                'bold small text-white'
              )}
            >
              &copy;{` ${new Date().getFullYear()} Ample Hills Creamery.`}
              <NavLink
                exact
                to="/privacy-policy"
                className={cx(
                  styles['Footer__link'],
                  'text-decoration-none ml1'
                )}
              >
                Privacy Policy
              </NavLink>
              ,
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://pos.toasttab.com/terms-of-service"
                className={cx(
                  styles['Footer__link'],
                  'text-decoration-none mx1'
                )}
              >
                Toast Privacy Policy
              </a>
              &
              <NavLink
                exact
                to="/web-accessibility"
                className={cx(
                  styles['Footer__link'],
                  'text-decoration-none mx1'
                )}
              >
                Accessibility
              </NavLink>
            </span>
          </div>
          <Image
            src={contentfulImgUtil(
              get(footerIllustration, 'fields.file.url', ''),
              '1000',
              'png'
            )}
            className={cx(
              styles['Footer__illustration'],
              'medium-down-display-none xs-hide sm-hide'
            )}
          />
        </div>
      </div>
    );
  }
}

export default Footer;

Footer.propTypes = {
  footerLinks: PropTypes.object,
  footerIcons: PropTypes.object
};

Footer.defaultProps = {
  footerLinks: null,
  footerIcons: null
};
