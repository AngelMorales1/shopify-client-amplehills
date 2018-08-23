import React, { Component } from 'react';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';

import { Image, Button } from 'components/base';

class HorizontalCarousel extends Component {
  render() {
    const { title, buttonLabel, buttonLink } = this.props;
    return (
      <div>
        <div>
          <span>{title}</span>
          <Button to={buttonLink} label={buttonLabel} />
        </div>
        <div />
      </div>
    );
  }
}

export default HorizontalCarousel;
