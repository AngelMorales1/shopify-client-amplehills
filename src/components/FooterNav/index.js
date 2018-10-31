import React, { PureComponent } from 'react';
import RoutesWithoutFooterExtras from 'constants/RoutesWithoutFooterExtras';

class FooterNav extends PureComponent {
  routeOmitsFooterNav = () => {
    return RoutesWithoutFooterExtras.includes(this.props.pathname);
  };

  render() {
    if (this.routeOmitsFooterNav()) return null;

    return (
      <div className="col-12">
        <div className="container-width mx-auto" />
      </div>
    );
  }
}

export default FooterNav;
