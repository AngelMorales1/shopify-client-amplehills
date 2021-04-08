import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import RoutesWithoutFooterExtras from 'constants/RoutesWithoutFooterExtras';
import get from 'utils/get';
import styles from './FooterNav.scss';

class FooterNav extends PureComponent {
  routeOmitsFooterNav = () => {
    return RoutesWithoutFooterExtras.includes(this.props.pathname);
  };

  render() {
    if (this.routeOmitsFooterNav()) return null;

    const items = Object.values(get(this.props, 'items.simpleFragments', {}));
    const defaultIcon = '/assets/images/bubble-icon.svg';
    if (!items.length) return null;

    return (
      <div className="col-12 drip bg-white z-1 relative">
        <div
          className={cx(
            styles['FooterNav__link-container'],
            'container-width mx-auto flex justify-center py3'
          )}
        >
          {items.map(item => (
            <div
              key={get(item, 'uuid')}
              className={cx(
                styles['FooterNav__link'],
                'flex flex-column center'
              )}
            >
              <a
                className="text-decoration-none hover-slide-up"
                href={get(item, 'link')}
              >
                <img
                  className="px4 w100"
                  src={get(item, 'icon.data', defaultIcon)}
                  alt={get(item, 'icon.name', '')}
                />
                <p className="py3 text-peach bold">{get(item, 'text')}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

FooterNav.propTypes = {
  pathname: PropTypes.string,
  items: PropTypes.shape({
    simpleFragments: PropTypes.objectOf(
      PropTypes.shape({
        icon: PropTypes.shape({
          data: PropTypes.string,
          name: PropTypes.name
        }),
        uuid: PropTypes.string,
        link: PropTypes.string,
        text: PropTypes.string
      })
    )
  })
};

FooterNav.defaultProps = {
  pathname: '',
  items: {
    simpleFragments: null
  }
};

export default FooterNav;
