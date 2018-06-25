import React, { Component } from 'react';
import { sortHours } from 'utils/sortHours';

class FooterRegions extends Component {
  render() {
    return (
      <div className="mr4">
        <h3 className="my2 text-white content-title">{this.props.region}</h3>
        {this.props.stores.map(store => {
          let hours = sortHours(store.fields);
          return (
            <div className="mb3" key={store.sys.id}>
              <h4 className="mb1 text-white bold small nowrap">
                {store.fields.title}
              </h4>
              {Object.keys(hours).map((hour, i) => {
                return (
                  <p className="mb1 text-white small nowrap" key={i}>{`${
                    hours[hour]
                  }: ${hour}`}</p>
                );
              })}
              {store.fields.delivery ? (
                <div className="bg-white text-madison-blue inline bold tag">
                  {' '}
                  > Order Delivery
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}

export default FooterRegions;
