/*eslint max-len: ["error", { "code": 500 }]*/
//
export default [
  {
    page: '/webvr',
    device: 'laptop',
    instructions: [
      {
        image: 'lol',
        header: 'You’ll need a WebVR-enabled browser and VR headset to fully enjoy this experience.',
        paragraph: 'In the meantime, click and drag to have a look around! '
      }
    ]
  },
  {
    page: '/webvr',
    device: 'mobile',
    instructions: [
      {
        image: 'lol',
        header: 'Attach your VR viewer onto your mobile device',
        paragraph: "Then look around the page and gaze at content that you'd like to open"
      }
    ]
  },
  {
    page: '/',
    device: 'mobile',
    instructions: [
      {
        image: 'lol',
        header: 'Rotate your device to explore',
        paragraph: "Then tap on content that you'd like to open"
      }
    ]
  },
  {
    page: '/webvr',
    device: 'tablet',
    instructions: [
      {
        image: 'lol',
        header: 'Attach your VR viewer onto your mobile device',
        paragraph: "Then look around the page and gaze at content that you'd like to open"
      }
    ]
  },
  {
    page: '/',
    device: 'tablet',
    instructions: [
      {
        image: 'lol',
        header: 'Rotate your device to explore',
        paragraph: "Then tap on content that you'd like to open"
      }
    ]
  }
];
