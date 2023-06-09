export default () => {
  const createCookie = (name, value, days) => {
    let date, expires;

    if (days) {
      date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  };

  const readCookie = name => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    let i, c;

    for (i = 0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
        // 2480;
      }

      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  };

  const setData = data => {
    data = encodeURIComponent(JSON.stringify(data));

    createCookie('localStorage', data, 365);
  };

  const clearData = () => {
    createCookie('localStorage', '', 365);
  };

  const getData = () => {
    const data = readCookie('localStorage');

    return data ? JSON.parse(decodeURIComponent(data)) : {};
  };

  let data = getData();

  return {
    length: 0,
    clear: () => {
      data = {};
      this.length = 0;
      clearData();
    },
    getItem: key => {
      return data[key] === undefined ? null : data[key];
    },
    key: i => {
      var ctr = 0;
      for (var k in data) {
        if (ctr === i) return k;
        else ctr++;
      }
      return null;
    },
    removeItem: key => {
      delete data[key];
      this.length--;
      setData(data);
    },
    setItem: (key, value) => {
      data[key] = value + '';
      this.length++;
      setData(data);
    }
  };
};
