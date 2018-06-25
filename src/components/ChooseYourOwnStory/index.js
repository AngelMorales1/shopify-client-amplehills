import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getProducts from 'state/selectors/getProducts';
import get from 'utils/get';

import { Radio } from 'components/base';
import Breadcrumbs from 'components/Breadcrumbs';
import OurPledge from 'components/OurPledge';
import ProductShoppableCard from 'components/ProductShoppableCard';

class ChooseYourOwnStory extends Component {
  render() {
    console.log('props', this.props);
    const { data, products, ourPledge } = this.props;
    const shoppableProducts = get(data, 'products', []);
    const breadcrumbs = [
      {
        to: '/products',
        label: 'Order Online'
      },
      {
        to: '/products/choose-your-own-story-4-pack',
        label: 'Choose Your Own Story'
      }
    ];

    return (
      <div className="mx-auto container-width">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="flex">
          <div className="col col-12 md-col-6 px2">
            {shoppableProducts.map(product => {
              const handle = get(product, 'fields.productHandle', '');
              if (!get(products, handle, false)) return null;

              return (
                <ProductShoppableCard
                  key={product.handle}
                  product={get(products, handle)}
                />
              );
            })}
          </div>
          <div className="col col-12 md-col-6 px4">
            <h1 className="block-headline mb4 relative z-1">
              {get(data, 'title')}
            </h1>
            <div className="w100 flex my3">
              <Radio label="4-Pack" className="mr3" />
              <Radio label="6-Pack" />
            </div>
            <div className="mb4">
              <p className="copy pr2">{get(data, 'description', '')}</p>
            </div>
            <OurPledge ourPledge={ourPledge} />
          </div>
        </div>
        <div className="fixed b0 l0 w100 bg-madison-blue text-white">Menu</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    products: getProducts(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(ChooseYourOwnStory);
