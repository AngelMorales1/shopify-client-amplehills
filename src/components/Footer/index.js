import React, { Component } from 'react';

<<<<<<< HEAD
import styles from './Footer.scss';
=======
import Locations from './Locations.js';
>>>>>>> render data

class Footer extends Component {
  sortDataByRegion(data = []) {
    return data.reduce((acc, cur) => {
      let region = cur.fields.region;
      acc[region]
        ? (acc[region] = acc[region].concat([cur]))
        : (acc[region] = [cur]);
      return acc;
    }, {});
  }

  render() {
    return (
<<<<<<< HEAD
      <div className={`${styles['Footer']} flex items-end`}>
        &copy; 2018 Ample Hills
=======
      <div>
        <Locations
          locations={this.sortDataByRegion(this.props.locations.items)}
        />
        <span>&copy; 2018 Ample Hills</span>
>>>>>>> render data
      </div>
    );
  }
}

export default Footer;
