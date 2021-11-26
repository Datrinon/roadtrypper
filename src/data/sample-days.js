const MOCK_TRIP_ID = "dans-0";

const SAMPLE_DAYS = [
  {
    tripId: "dans-0",
    id: 0,
    order: 0,
    title: "Adventure Beginnings",
    color: "0066ff",
    pois: [
      {
        id: 0,
        order: 0,
        title: "Point Arena",
        coordinates: [37.769796221341544, -122.48632397567849],
        description: "We began by first visiting the beach.",
        photos: [
          {
            path: "url01.jpg",
            description: "A picture of the beach (01)."
          },
          {
            path: "url02.jpg",
            description: "A picture of the beach (02)."
          },
          {
            path: "url03.jpg",
            description: "A picture of the beach (03)."
          }
        ]
      },
      {
        id: 1,
        order: 1,
        title: "Point Bravo",
        coordinates: [38.004782882158985, -122.54414829028939],
        description: "We went to its sequel.",
        photos: [
          {
            path: "url01.jpg",
            description: "A picture of the beach (01)."
          },
          {
            path: "url02.jpg",
            description: "A picture of the beach (02)."
          },
          {
            path: "url03.jpg",
            description: "A picture of the beach (03)."
          }
        ]
      },
    ],
  },
  {
    tripId: "dans-0",
    id: 1,
    title: "Adventure Mid",
    order: 1,
    color: "ff3300",
    pois: [
      {
        id: 0,
        order: 0,
        title: "Point Charlie",
        coordinates: [38.44143980971588, -122.72341248007122],
        description: "We went to its sequel, the beach.",
        photos: [
          {
            path: "url01.jpg",
            description: "A picture of the beach (01)."
          },
          {
            path: "url02.jpg",
            description: "A picture of the beach (02)."
          },
          {
            path: "url03.jpg",
            description: "A picture of the beach (03)."
          }
        ]
      },
      {
        id: 1,
        order: 1,
        title: "Point Delta",
        coordinates: [39.20241934394004, -123.77596475597744],
        description: "We went to its sequel.",
        photos: [
          {
            path: "url01.jpg",
            description: "A picture of the beach (01)."
          },
          {
            path: "url02.jpg",
            description: "A picture of the beach (02)."
          },
          {
            path: "url03.jpg",
            description: "A picture of the beach (03)."
          }
        ]
      },
      {
        id: 2,
        order: 2,
        title: "Point Echo",
        coordinates: [39.446531884721345, -123.80626325845876],
        description: "We went to its sequel.",
        photos: [
          {
            path: "url01.jpg",
            description: "A picture of the beach (01)."
          },
          {
            path: "url02.jpg",
            description: "A picture of the beach (02)."
          },
          {
            path: "url03.jpg",
            description: "A picture of the beach (03)."
          }
        ]
      },
    ],
  },
  {
    tripId: "dans-0",
    id: 2,
    order: 2,
    title: "The Great Capital",
    color: "00cc00",
    pois: [
      {
        id: 0,
        order: 0,
        title: "Point Foxtrot",
        coordinates: [40.800864341737125, -124.17428934474253],
        description: "We went to Echo's sequel.",
        photos: [
          {
            path: "url01.jpg",
            description: "A picture of the beach (01)."
          },
          {
            path: "url02.jpg",
            description: "A picture of the beach (02)."
          },
          {
            path: "url03.jpg",
            description: "A picture of the beach (03)."
          }
        ]
      },
      {
        id: 1,
        order: 1,
        title: "Point Golf",
        coordinates: [40.95013460720063, -124.12410503664906],
        description: "We went to Foxtrot's sequel.",
        photos: [
          {
            path: "url01.jpg",
            description: "A picture of the beach (01)."
          },
          {
            path: "url02.jpg",
            description: "A picture of the beach (02)."
          },
          {
            path: "url03.jpg",
            description: "A picture of the beach (03)."
          }
        ]
      },
      {
        id: 2,
        order: 2,
        title: "Point Hotel",
        coordinates: [41.75653691963277, -124.17986118946551],
        description: "We went to Golf's sequel.",
        photos: [
          {
            path: "url01.jpg",
            description: "A picture of the beach (01)."
          },
          {
            path: "url02.jpg",
            description: "A picture of the beach (02)."
          },
          {
            path: "url03.jpg",
            description: "A picture of the beach (03)."
          }
        ]
      },
    ],
  },
];

const SAMPLE_DAYS_v2 = [
  {
    tripId: "dans-0",
    id: 0,
    order: 0,
    title: "Adventure Beginnings",
    color: "0066ff",
  },
  {
    tripId: "dans-0",
    id: 1,
    title: "Adventure Mid",
    order: 1,
    color: "ff3300",
  },
  {
    tripId: "dans-0",
    id: 2,
    order: 2,
    title: "The Great Capital",
    color: "00cc00",
  }
]

export { SAMPLE_DAYS, SAMPLE_DAYS_v2, MOCK_TRIP_ID };
