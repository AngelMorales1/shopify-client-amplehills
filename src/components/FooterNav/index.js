import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RoutesWithoutFooterExtras from 'constants/RoutesWithoutFooterExtras';
import get from 'utils/get';

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
      <div className="xs-hide sm-hide col-12 drip bg-white z-1 relative">
        <div className="container-width mx-auto flex py3">
          {items.map(item => (
            <div
              key={get(item, 'uuid')}
              className="w100 flex flex-column center"
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
  items: PropTypes.oneOfType(
    PropTypes.arrayOf(
      PropTypes.shape({
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
    ),
    PropTypes.object
  )
};

FooterNav.defaultProps = {
  pathname: '',
  items: [
    {
      simpleFragments: {}
    }
  ]
};

export default FooterNav;
