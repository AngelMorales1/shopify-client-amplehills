import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

class HTMLEmbed extends Component {
  render() {
    console.log('ZING', this.props);

    const fields = get(this, 'props.block.fields');
    if (!fields) return null;

    const fragment = get(fields, 'fragmentType.simpleFragments');
    if (!fragment) return null;

    console.log('OBJ', Object.values(fragment));
    const embed = get(Object.values(fragment), '[0].html', '');
    if (!embed) return null;

    console.log('EMBED', embed);

    return (
      <div className="HTMLEmbed">
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
