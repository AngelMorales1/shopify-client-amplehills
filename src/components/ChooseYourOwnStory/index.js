import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import products from 'state/selectors/products';
import get from 'utils/get';

import { Radio, Image, Button, QuantitySelector } from 'components/base';
import Breadcrumbs from 'components/Breadcrumbs';
import OurPledge from 'components/OurPledge';
import ProductShoppableCard from 'components/ProductShoppableCard';
import styles from './ChooseYourOwnStory.scss';

class ChooseYourOwnStory extends Component {
  render() {
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
                  key={handle}
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
        <div className="fixed b0 l0 w100 bg-madison-blue text-white p3">
          <div className="flex content-width mx-auto w100">
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-size'],
                'col flex items-start'
              )}
            >
              <Radio
                className="mr3"
                checked={true}
                label="4-Pack"
                variant="vertical"
                color="white"
              />
              <Radio label="6-Pack" variant="vertical" color="white" />
            </div>
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-pints'],
                'col flex flex-wrap items-center'
              )}
            >
              <label>Choose 4 Flavors</label>
              <div className="flex w100 justify-start pt2">
                <Image className="mr2" src="/assets/images/icon-pint.svg" />
                <Image className="mr2" src="/assets/images/icon-pint.svg" />
                <Image className="mr2" src="/assets/images/icon-pint.svg" />
                <Image className="mr2" src="/assets/images/icon-pint.svg" />
              </div>
            </div>
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-shipping'],
                'col flex flex-wrap items-end'
              )}
            >
              <label className="w100 mb2">Pick Your Ship Date</label>
              <Button
                variant="primary-small"
                color="madison-blue-outline"
                className="small mr2"
                label="May 4"
              />
              <Button
                variant="primary-small"
                color="madison-blue-outline"
                className="small"
                label="May 8"
              />
            </div>
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-add'],
                'col flex justify-end items-end'
              )}
            >
              <QuantitySelector color="madison-blue-outline" className="mr4" />
              <Button
                className="small"
                variant="primary-small"
                color="white-madison-blue"
                label="Add to Cart"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    products: products(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(ChooseYourOwnStory);
