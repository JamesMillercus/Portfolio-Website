/*eslint max-len: ["error", { "code": 500 }]*/
//
export default [
  {
    page: '/webvr',
    device: 'laptop',
    instructions: [
      {
        image: 'mobileIntro.gif',
        header: 'You’ll need a WebVR-enabled browser and VR headset to fully enjoy this experience.',
        paragraph: "Once you've put on the headset, click on the WebVR icon and use your VR controllers to interact with content. If you don't have a headset, then you can click and drag with your trackpad/mouse to explore!"
      }
    ]
  },
  {
    page: '/webvr',
    device: 'mobile',
    instructions: [
      {
        image: 'mobile-webvr.gif',
        header: "Welcome to WebVR",
        paragraph: "Go into your device's settings and ensure that gyroscope has been activated (on IOS this can be found within Safari's settings), then unfold your VR viewer and attach it to your phone. Hold the device and the VR viewer to your face and gaze at content that you'd like to explore!"
      }
    ]
  },
  {
    page: '/',
    device: 'mobile',
    instructions: [
      {
        image: 'mobileIntro.gif',
        header: 'Welcome',
        paragraph: "Use your finger to scroll in all directions and tap on content that you'd like to explore!"
      }
    ]
  },
  {
    page: '/webvr',
    device: 'tablet',
    instructions: [
      {
        image: 'mobile-webvr.gif',
        header: 'Welcome to WebVR',
        paragraph: "Go into your device's settings and ensure that gyroscope has been activated (on IOS this can be found within Safari's settings), then unfold your VR viewer and attach it to your phone. Hold the device and the VR viewer to your face and gaze at content that you'd like to explore!"
      }
    ]
  },
  {
    page: '/',
    device: 'tablet',
    instructions: [
      {
        image: 'mobileIntro.gif',
        header: 'Welcome to my website!',
        paragraph: "This website is built so that you can use your finger to scroll in all directions, once you find content you'd like to view - tap on it to explore!"
      }
    ]
  },
  {
    page: '/',
    device: 'vrheadset',
    browser: 'Oculus Browser',
    instructions: [
      {
        image: 'mobileIntro.gif',
        header: 'Look around the space to explore',
        paragraph: "Then use your controller to interact with the content"
      }
    ]
  }
];
