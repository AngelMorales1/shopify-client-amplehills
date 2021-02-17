import get from 'lodash/get';

const portableTextAsString = portableText => {
  if (typeof portableText === 'string') {
    return portableText;
  }

  return portableText.reduce((text, portableTextBlock) => {
    if (get(portableTextBlock, '_type') === 'block') {
      return (
        text +
        get(portableTextBlock, 'children', [])
          .map(child => get(child, 'text', ''))
          .join('')
      );
    }

    return text;
  }, '');
};

export default portableTextAsString;
