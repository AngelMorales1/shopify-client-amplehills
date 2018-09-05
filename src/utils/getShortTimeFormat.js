export default time => {
  //input: 6:00pm - 10:00pm  output: 6-10pm
  //input: 6:00pm  output: 6pm
  //input: 6:10pm - 8:45pm  output: 6:10-8:45pm

  if (time && time.length) {
    const timeSplit = time.replace(/\s+/g, '').split('-');

    return timeSplit
      .map((time, i) => {
        let hourAndMin = time.replace(/\s+/g, '').split(':');
        let min = hourAndMin[1] || '';
        const isExactTime = min.slice(0, 2) === '00';

        if (timeSplit.length > 1) {
          if (isExactTime) {
            if (i === 0) {
              return hourAndMin[0];
            } else {
              const getAmPm = min.slice(-2);
              return `${hourAndMin[0]}${getAmPm}`;
            }
          } else {
            if (i === 0) {
              const removeAmPm = min.slice(0, -2);
              return `${hourAndMin[0]}:${removeAmPm}`;
            } else {
              return `${hourAndMin[0]}:${min}`;
            }
          }
        } else {
          if (isExactTime) {
            const getAmPm = min.slice(-2);
            return `${hourAndMin[0]}${getAmPm}`;
          } else {
            return `${hourAndMin[0]}:${min}`;
          }
        }
      })
      .join('-');
  }
};
