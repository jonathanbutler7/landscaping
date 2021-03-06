function createOrders() {
  return [
    {
      _id: '96c29feb-fffa-43a9-b794-b758cc885b47',
      date_created: '2020-12-12T01:25:31.391Z',
      type: 'power washing',
      date_requested: 'December 10',
      zip: '76101',
      status: 'available',
      items: [
        {
          material: 'wood',
          measurement: 200,
          units: 'sqft',
          name: 'deck',
        },
        {
          material: 'wood',
          measurement: 200,
          units: 'sqft',
          name: 'deck',
        },
      ],
    },
    {
      _id: '1e7bac54-f9f5-4b27-a050-8779b6b6bd1d',
      date_created: '2020-12-12T01:25:31.391Z',
      type: 'fencing',
      date_requested: 'December 10',
      zip: '76020',
      status: 'available',
      items: [
        {
          material: 'wood',
          measurement: 200,
          units: 'sqft',
          name: 'deck',
        },
        {
          material: 'wood',
          measurement: 200,
          units: 'sqft',
          name: 'deck',
        },
      ],
    },
    {
      _id: '212505cb-47e7-456e-b6b4-11e545ed0ad5',
      date_created: '2020-12-12T01:25:31.391Z',
      type: 'cabinets',
      date_requested: 'December 10',
      zip: '76550',
      status: 'done',
      items: [
        {
          material: 'wood',
          measurement: 200,
          units: 'sqft',
          name: 'deck',
        },
        {
          material: 'wood',
          measurement: 200,
          units: 'sqft',
          name: 'deck',
        },
      ],
    },
    {
      _id: '5b0876a6-cd3c-40d2-8b99-328510be8aed',
      date_created: '2020-12-12T01:25:31.391Z',
      type: 'tiny homes',
      date_requested: 'December 10',
      zip: '76600',
      status: 'claimed',
      items: [
        {
          material: 'wood',
          measurement: 200,
          units: 'sqft',
          name: 'deck',
        },
        {
          material: 'wood',
          measurement: 200,
          units: 'sqft',
          name: 'deck',
        },
      ],
    },
    {
      _id: '5047f433-2e88-4d14-941d-9b21d9242850',
      date_created: '2020-12-12T01:25:31.391Z',
      type: 'railing',
      date_requested: 'December 10',
      zip: '76765',
      status: 'available',
      items: [
        {
          material: 'wood',
          measurement: 200,
          units: 'sqft',
          name: 'deck',
        },
        {
          material: 'wood',
          measurement: 200,
          units: 'sqft',
          name: 'deck',
        },
      ],
    },
  ];
}

module.exports = { createOrders };
