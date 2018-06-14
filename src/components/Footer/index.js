import React, { Component } from 'react';

<<<<<<< HEAD
<<<<<<< HEAD
import styles from './Footer.scss';
=======
=======
import styles from './Footer.scss';

>>>>>>> clean up sorthours function
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
<<<<<<< HEAD
      <div className={`${styles['Footer']} flex items-end`}>
        &copy; 2018 Ample Hills
=======
      <div>
=======
      <div className={`${styles['footer-container']} p4`}>
>>>>>>> clean up sorthours function
        <Locations
          locations={this.sortDataByRegion(this.props.locations.items) || {}}
        />
        <span>&copy; 2018 Ample Hills</span>
>>>>>>> render data
      </div>
    );
  }
}

export default Footer;
