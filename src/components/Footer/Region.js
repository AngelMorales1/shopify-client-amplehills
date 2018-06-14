import React, { Component } from 'react';

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
        for (let i = 0; i < days.length; i++) {
          if (
            weeksInOrder.indexOf(days[i + 1]) -
              weeksInOrder.indexOf(days[i]) !==
            1
          ) {
            acc[cur] = `${this.makeFirstLetterUppercase(
              days[i + 1]
            )} - ${this.makeFirstLetterUppercase(days[0])}`;
            return acc;
          }
        }
      } else if (days.length === 7) {
        acc[cur] = 'Everyday';
        return acc;
      }
      days.length > 1
        ? (acc[cur] = `${this.makeFirstLetterUppercase(
            days[0]
          )} - ${this.makeFirstLetterUppercase(days[days.length - 1])}`)
        : (acc[cur] = this.makeFirstLetterUppercase(days[0]));
      return acc;
    }, {});

    return sortAsPeriod;
  }

  makeFirstLetterUppercase(str) {
    return str[0].toUpperCase() + str.slice(1, 3);
  }

  render() {
    return (
      <div className="border">
        <h1>
          <strong>{this.props.region}</strong>
        </h1>
        {this.props.stores.map(store => {
          let hours = this.sortHours(store.fields);
          return (
            <div key={store.sys.id}>
              {store.fields.title}
              {Object.keys(hours).map((hour, idx) => {
                return <div key={idx}>{`${hours[hour]}: ${hour}`}</div>;
              })}
              {store.fields.delivery ? <button>ORDER DELIVERY</button> : null}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Region;
