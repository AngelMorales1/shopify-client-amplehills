import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import marked from 'marked';

import { Button, Image } from 'components/base';
import styles from './FAQBlock.scss';

class FAQBlock extends Component {
  state = {
    selectedItem: ''
  };

  render() {
    const { z, block, setRef } = this.props;
    const { selectedItem } = this.state;
    const title = get(block, 'title', '');
    const dripIsOn = get(block, 'drip', false);
    const upperDripIsOn = get(block, 'upperDrip', false);
    const buttonLabel = get(block, 'buttonLabel', '');
    const buttonLink = get(block, 'buttonLink', '');
    const text = get(block, 'text', '');
    const rows = get(block, 'questions', []);

    return (
      <div
        ref={refBlock => setRef(refBlock)}
        style={{ zIndex: z }}
        className={cx('flex justify-center px3 py4 bg-white', {
          drip: dripIsOn,
          'upper-drip': upperDripIsOn
        })}
      >
        <div className={cx(styles['FAQBlock'], 'mt3 w100 flex content-width')}>
          <div
            className={cx(
              styles['FAQBlock__block-title-container'],
              'flex flex-column col-12 md-col-4 mb4'
            )}
          >
            <h2 className="block-headline mb3">{title}</h2>
            {buttonLabel && buttonLink ? (
              <div className={cx(styles['FAQBlock__block-button'])}>
                <Button
                  variant="primary-responsive"
                  className="inline-flex"
                  label={buttonLabel}
                  to={buttonLink}
                  color="madison-blue"
                />
              </div>
            ) : null}
          </div>
          <div
            className={cx(
              styles['FAQBlock__FAQ-container'],
              'col-12 md-col-8 form-container-width'
            )}
          >
            {rows.map(row => {
              const uuid = get(row, '_key', '');
              const dropdownIsOpen = selectedItem === uuid;

              return get(row, '_type', '') === 'heading' ? (
                <p
                  key={uuid}
                  className={cx(
                    styles['FAQBlock__title'],
                    'uppercase bold text-peach mb3'
                  )}
                >
                  {get(row, 'heading', '')}
                </p>
              ) : (
                <div key={uuid} className="my2 w100">
                  <div className="flex flex-row justify-between items-start">
                    <Button
                      ariaLabel={`Open question: ${get(row, 'question', '')}`}
                      className={cx(
                        styles['FAQBlock__question'],
                        'col-10 flex flex-start'
                      )}
                      variant="style-none"
                      onClick={() =>
                        this.setState({
                          selectedItem: dropdownIsOpen ? '' : uuid
                        })
                      }
                    >
                      <p className="text-madison-blue semi-bold">
                        {get(row, 'question', '')}
                      </p>
                    </Button>
                    <Button
                      className={cx(
                        { 'display-none': dropdownIsOpen },
                        'transition-slide-up col-2'
                      )}
                      ariaLabel="Open dropdown"
                      variant="style-none"
                      onClick={() => this.setState({ selectedItem: uuid })}
                    >
                      <Image
                        className={cx(styles['FAQBlock__arrow'], 'ml-auto')}
                        src="/assets/images/arrow-dropdown-active-peach.svg"
                        alt="Open dropdown icon."
                      />
                    </Button>
                    <Button
                      aria-hidden={!dropdownIsOpen}
                      ariaLabel="Close dropdown"
                      className={cx(
                        { 'display-none': !dropdownIsOpen },
                        'transition-slide-up col-2'
                      )}
                      variant="style-none"
                      onClick={() => this.setState({ selectedItem: '' })}
                    >
                      <Image
                        className={cx(styles['FAQBlock__arrow'], 'ml-auto')}
                        src="/assets/images/arrow-dropdown-inactive-peach.svg"
                        alt="Close dropdown icon."
                      />
                    </Button>
                  </div>
                  <p
                    aria-hidden={!dropdownIsOpen}
                    className={cx(
                      styles['FAQBlock__answer'],
                      { 'display-none': !dropdownIsOpen },
                      'block-subheadline pt4 pb4 mb3 transition-slide-up'
                    )}
                  >
                    {get(row, 'answer', '')}
                  </p>
                </div>
              );
            })}
            {text ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(text)
                }}
                className="markdown-block semi-bold mt3"
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

FAQBlock.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      buttonLabel: PropTypes.string,
      buttonLink: PropTypes.string,
      headingAndQa: PropTypes.shape({
        fragments: PropTypes.array
      })
    })
  }),
  setRef: PropTypes.func
};

FAQBlock.defaultProps = {
  z: 0,
  block: {
    fields: {
      buttonLabel: '',
      buttonLink: '',
      headingAndQa: {
        fragments: []
      }
    }
  },
  setRef: () => {}
};

export default FAQBlock;
