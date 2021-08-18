import React from 'react';

import { Button } from 'components/base';
import styles from './TwoUpCardLinks.scss';

const TwoUpCardLinks = ({ block }) => {
  if (!block.card1 || !block.card2) return null;

  return (
    <div className={`${styles['TwoUpCardLinks']} flex mx-auto col-12`}>
      {[block.card1, block.card2].map(card => {
        return (
          <div
            className={`${styles['TwoUpCardLinks__card']} ${
              styles[`TwoUpCardLinks__card--${card.backgroundColor}`]
            } mb2 px3 py2 flex items-center justify-between`}
          >
            <div className="pr3">
              <span className="block callout mb1">{card.title}</span>
              <span className="small-title block text-peach">
                {card.subtitle}
              </span>
            </div>
            <div>
              <Button
                className="text-madison-blue uppercase small"
                label={card.linkText}
                to={card.link}
                variant="underline-peach"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TwoUpCardLinks;
