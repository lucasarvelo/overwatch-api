import rp from 'request-promise';


export default function(cb) {
  const url = 'https://api.overwatchleague.com/v2/standings';

  const options = {
    uri: encodeURI(url),
    encoding: 'utf8',
    json: true,
  }

  rp(options).then((resp) => {
    const includes = [
      'id',
      'divisionId',
      'name',
      'abbreviatedName',
      'league',
      'stages',
      'preseason',
    ];

    // Filter only the properties we want to use.
    const filtered = resp.data.map(o => {
      return Object.keys(o)
        .filter(key => includes.includes(key))
        .reduce((obj, key) => {
          obj[key] = o[key];
          return obj;
        }, {});
    });

    const json = {
      data: filtered,
    }

    cb(json);
  }).catch(err => {
    cb(err);
  });
}