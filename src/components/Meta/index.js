import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import contentfulImgUtil from 'utils/contentfulImgUtil';

const Defaults = {
  TITLE: 'Ample Hills Creamery – Order Online',
  DESCRIPTION: '',
  IMAGE: ''
};

class Meta extends Component {
  render() {
    const {
      title = Defaults.TITLE,
      description = Defaults.DESCRIPTION,
      image = Defaults.IMAGE,
      canonicalUrl = window.location.href
    } = this.props;

    return (
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={canonicalUrl} />
        {description && <meta name="description" content={description} />}

        <meta property="og:title" content={title} />
        {description && (
          <meta property="og:description" content={description} />
        )}
        {image && (
          <meta
            property="og:image"
            content={contentfulImgUtil(image, '1200')}
          />
        )}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Ample Hills Creamery" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:title" content={title} />
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        {image && (
          <meta
            name="twitter:image"
            content={contentfulImgUtil(image, '1200')}
          />
        )}
        <meta name="twitter:site" content="@amplehills" />
        <meta name="twitter:creator" content="@amplehills" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    );
  }
}

export default Meta;
