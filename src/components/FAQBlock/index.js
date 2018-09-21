import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';

import { Button, Image } from 'components/base';
import styles from './FAQBlock.scss';

class FAQBlock extends Component {
  state = {
    selectedItem: ''
  };

  render() {
    const { z, block, setRef } = this.props;
    const { selectedItem } = this.state;
    const fields = get(block, 'fields', {});
    const title = get(fields, 'title', '');
    const buttonLabel = get(fields, 'buttonLabel', '');
    const buttonLink = get(fields, 'buttonLink', '');
    const fragments = get(fields, 'headingAndQa.fragments', []).map(
      fragment => {
        return fragment.reduce((sortedFragment, fragmentItem) => {
          const key = fragmentItem.key.toLowerCase();

          if (fragmentItem.value) {
            sortedFragment[key] = fragmentItem.value;
          }

          return sortedFragment;
        }, {});
      }
    );

    return (
      <div ref={refBlock => setRef(refBlock)} style={{ zIndex: z }}>
        <div className={cx(styles['FAQBlock'], 'flex')}>
          <div
            className={cx(
              styles['FAQBlock__block-title-container'],
              'flex col-12 md-col-5 pr-3 mb4'
            )}
          >
            <div>
              <h2
                className={cx(
                  styles['FAQBlock__block-title'],
                  'block-headline mb3'
                )}
              >
                {title}
              </h2>
              {buttonLabel && buttonLink ? (
                <div className="inline-flex mb3">
                  <Button
                    label={buttonLabel}
                    to={buttonLink}
                    color="madison-blue"
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-12 md-col-7">
            <div className="form-container-width mx-auto">
              {fragments.map(fragment => {
                const uuid = get(fragment, 'uuid', '');
                const dropdownIsOpen = this.state.selectedItem === uuid;

                return get(fragment, 'type', '') === 'Heading' ? (
                  <p
                    className={cx(
                      styles['FAQBlock__title'],
                      'uppercase bold text-peach mb3'
                    )}
                  >
                    {get(fragment, 'heading', '')}
                  </p>
                ) : (
                  <div className="my2">
                    <div className="w100">
                      <div className="flex flex-row justify-between items-start">
                        <Button
                          className={cx(
                            styles['FAQBlock__question'],
                            'col-10 flex flex-start'
                          )}
                          variant="style-none"
                          onClick={() =>
                            this.state.selectedItem === uuid
                              ? this.setState({ selectedItem: '' })
                              : this.setState({ selectedItem: uuid })
                          }
                        >
                          <p className="text-madison-blue semi-bold">
                            {get(fragment, 'question', '')}
                          </p>
                        </Button>
                        <Button
                          className={cx(
                            { 'display-none': dropdownIsOpen },
                            'transition-slide-up col-2'
                          )}
                          variant="style-none"
                          onClick={() => this.setState({ selectedItem: uuid })}
                        >
                          <Image
                            className={cx(styles['FAQBlock__arrow'], 'ml-auto')}
                            src="/assets/images/arrow-dropdown-active-peach.svg"
                          />
                        </Button>
                        <Button
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
                          />
                        </Button>
                      </div>
                    </div>
                    <p
                      className={cx(
                        styles['FAQBlock__answer'],
                        { 'display-none': !dropdownIsOpen },
                        'block-subheadline pt4 pb4 mb3 transition-slide-up'
                      )}
                    >
                      {get(fragment, 'answer', '')}
                    </p>
                  </div>
                );
              })}
            </div>
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
