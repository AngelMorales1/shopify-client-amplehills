const csvToJson = require('csvtojson');
const fs = require('fs');

const origins = ['17104', '54234', '60525', '89512'];

const convertCsvsToJson = async function() {
  for (let i = 0; i < origins.length; i++) {
    const origin = origins[i];
    const pathToFile = `./constants/shipping/${origin} _Sat_TNT.csv`;

    console.log(pathToFile);
    await csvToJson()
      .fromFile(pathToFile)
      .then(function(json) {
        const jsonOnDest = json.reduce(function(jsonOnDest, obj) {
          // Create massive object of ZIP:TNT pairs
          jsonOnDest[obj['Dest Zip']] = parseInt(obj['TNTDAYS']);

          return jsonOnDest;
        }, {});

        return fs.writeFile(
          `./constants/shipping/${origin}.json`,
          JSON.stringify(jsonOnDest),
          function() {
            console.log(`${origin} saved.`);
          }
        );
      });
  }
};

convertCsvsToJson();
