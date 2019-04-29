import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

class HTMLEmbed extends Component {
  componentDidMount() {
    if (!document.getElementById('play-buzz')) {
      this.loadScript();
    }
  }

  loadScript = () => {
    const script = document.createElement('script');
    script.src = 'https://embed.playbuzz.com/sdk.js';
    script.async = true;

    document.body.appendChild(script);
  };

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

HTMLEmbed.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      fragmentType: PropTypes.shape({
        simpleFragments: PropTypes.objectOf(
          PropTypes.shape({
            html: PropTypes.string
          })
        )
      })
    })
  })
};

HTMLEmbed.defaultProps = null;

export default HTMLEmbed;
