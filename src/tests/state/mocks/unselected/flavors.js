export default {
  items: [
    {
      fields: {
        title: 'Flavor 1',
        dietaryRestrictions: {
          fragments: [],
          simpleFragments: {}
        },
        filters: {
          fragments: [
            [
              { key: 'uuid', value: '1' },
              {
                key: 'Filter Name',
                type: 'Symbol',
                value: 'chocolate',
                _schemaRef: '1'
              }
            ]
          ],
          simpleFragments: {
            1: {
              uuid: '1',
              index: 0,
              filterName: 'chocolate'
            }
          }
        },
        image: {
          fields: {
            title: 'image-title',
            file: {
              url: '/image-url'
            }
          },
          sys: {
            id: '6mz9f9KA3CmaW8g2OsEWoM'
          }
        },
        label: 'In Store Only'
      },
      sys: {
        id: '30e8A5crO0KwMwWcOmAAmG'
      }
    },
    {
      fields: {
        title: 'Flavor 2',
        dietaryRestrictions: {
          fragments: [],
          simpleFragments: {}
        },
        filters: {
          fragments: [
            [
              { key: 'uuid', value: '2' },
              {
                key: 'Filter Name',
                type: 'Symbol',
                value: 'Vanilla',
                _schemaRef: '2'
              }
            ]
          ],
          simpleFragments: {
            1: {
              uuid: '2',
              index: 0,
              filterName: 'Vanilla'
            }
          }
        },
        image: {
          fields: {
            title: 'image-title',
            file: {
              url: '/image-url'
            }
          },
          sys: {
            id: '6mz9f9KA3CmaW8g2OsEWoM'
          }
        },
        label: 'In Store Only'
      },
      sys: {
        id: '30e8A5crO0KwMwWcOmAAmG'
      }
    }
  ]
};
