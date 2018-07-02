import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { Image, Button } from 'components/base';
import styles from './ComicStrip.scss';

class ComicStrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFlavor: false
    };
  }

  isActiveFlavor(id, index) {
    return (
      this.state.activeFlavor === id || (!index && !this.state.activeFlavor)
    );
  }

  render() {
    console.log(this.props);
    const { block, z } = this.props;
    const fields = get(block, 'fields', {});

    const colorClass = `ComicStrip--${get(fields, 'color', 'Yellow')}`;
    return <div />;
  }
}

export default ComicStrip;
