/*eslint max-len: ["error", { "code": 500 }]*/
//
export default [
  {
    page: '/webvr',
    device: 'laptop',
    instructions: [
      {
        image: 'laptop-webvr.gif',
        header: 'Welcome to my WebVR portfolio',
        paragraph: "Put on your VR headset, look around the space to explore and then use your controller to interact with the content."
      }
    ]
  },
  {
    page: '/webvr',
    device: 'mobile',
    instructions: [
      {
        image: 'mobile-webvr.gif',
        header: "Experimental WebVR portfolio",
        paragraph: "To use this page you will need to ensure that the gyroscope has been activated in your device's settings, then unfold your VR viewer and attach it to your phone. Look through the VR viewer and gaze at content that you'd like to explore, don't forget you will need to tap videos to play/close them!"
      }
    ]
  },
  {
    page: '/',
    device: 'mobile',
    instructions: [
      {
        image: 'mobileIntro.gif',
        header: 'Welcome to my 360° portfolio',
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
        header: 'Experimental WebVR portfolio',
        paragraph: "To use this page you will need to ensure that the gyroscope has been activated in your device's settings, then unfold your VR viewer and attach it to your phone. Look through the VR viewer and gaze at content that you'd like to explore, don't forget you will need to tap videos to play/close them!"
      }
    ]
  },
  {
    page: '/',
    device: 'tablet',
    instructions: [
      {
        image: 'mobileIntro.gif',
        header: 'Welcome to my 360° portfolio',
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
        image: 'laptop-webvr.gif',
        header: 'Welcome to my WebVR portfolio',
        paragraph: "Look around the space to explore and then use your controller to interact with the content."
      }
    ]
  }
];
