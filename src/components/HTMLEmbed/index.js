import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

class HTMLEmbed extends Component {
  render() {
    const fields = get(this, 'props.block.fields');
    if (!fields) return null;

    const fragment = get(fields, 'fragmentType.simpleFragments');
    if (!fragment) return null;

    const embed = get(Object.values(fragment), '[0].html', '');
    if (!embed) return null;

    return (
      <div className="HTMLEmbed my4">
        <div
          className="HTMLEmbed__embed"
          dangerouslySetInnerHTML={{ __html: embed }}
        />
      </div>
    );
  }
}

HTMLEmbed.propTypes = {};

HTMLEmbed.defaultProps = {};

export default HTMLEmbed;
