import React, { Component } from 'react';

import styles from './Footer.scss';

class Region extends Component {
  sortHours(fields) {
    let weeksInOrder = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ];

    //sort data to have only open hours
    let openHours = Object.keys(fields)
      .filter(field => field.includes('day'))
      .reduce((acc, cur) => {
        acc[cur] = fields[cur];
        return acc;
      }, {});

    //sorting by same open hours
    let sortByOpenHours = weeksInOrder.reduce((acc, cur) => {
      let time = openHours[cur];
      acc[time] ? (acc[time] = acc[time].concat([cur])) : (acc[time] = [cur]);
      return acc;
    }, {});

    let sortAsPeriod = Object.keys(sortByOpenHours).reduce((acc, cur) => {
      let days = sortByOpenHours[cur];

      if (
        days.includes(weeksInOrder[0]) &&
        days.includes(weeksInOrder[weeksInOrder.length - 1]) &&
        days.length < 7
      ) {
        days.forEach((day, idx) => {
          if (
            weeksInOrder.indexOf(days[idx + 1]) - weeksInOrder.indexOf(day) !==
              1 &&
            idx !== days.length - 1
          ) {
            acc[cur] = `${this.abbreviateDay(
              days[idx + 1]
            )} - ${this.abbreviateDay(day)}`;
          }
        });

        return acc;
      } else if (days.length === 7) {
        acc[cur] = 'Everyday';
        return acc;
      }
      days.length > 1
        ? (acc[cur] = `${this.abbreviateDay(days[0])} - ${this.abbreviateDay(
            days[days.length - 1]
          )}`)
        : (acc[cur] = this.abbreviateDay(days[0]));
      console.log('final', acc);
      return acc;
    }, {});

    return sortAsPeriod;
  }

  abbreviateDay(str) {
    return str[0].toUpperCase() + str.slice(1, 3);
  }

  render() {
    return (
      <div className="border">
        <h1
          className={`${styles['footer--font-color']} ${
            styles['sub-title-text']
          } my2`}
        >
          {this.props.region}
        </h1>
        {this.props.stores.map(store => {
          let hours = this.sortHours(store.fields);
          return (
            <div key={store.sys.id}>
              <p
                className={`${styles['footer--font-color']} ${
                  styles['content-text']
                } my1`}
              >
                <strong>{store.fields.title}</strong>
              </p>
              {Object.keys(hours).map((hour, idx) => {
                return (
                  <p
                    className={`${styles['footer--font-color']} ${
                      styles['content-text']
                    } my1`}
                    key={idx}
                  >{`${hours[hour]}: ${hour}`}</p>
                );
              })}
              {store.fields.delivery ? (
                <button className={`${styles['region-button']}`}>
                  ORDER DELIVERY
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Region;
