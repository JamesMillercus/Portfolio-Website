/*eslint max-len: ["error", { "code": 500 }]*/

export default {
  page: 'home',
  itemText: [
    {
      header: 'Mood Tree',
      paragraph: 'D&AD wanted to promote social activity during their design festival. I created the electronics for an installation that utilised Twitter’s API and Stanfords Natural Language parser, to analyse live tweets on the events ‘#’. A keyword and colour was displayed on each of the trees leaves, based on that tweets collected sentiment.',
    }, {
      header: 'Pay @ Pump',
      paragraph: 'Barclaycard wanted to explore how their contactless technology could help reduce queues at bars on nights out. Using their contactless card payment system, I worked as part of the team that designed a prototype beer pump, that was automated to accurately pour a pint of beer once a successful payment had been received.',
    }, {
      header: 'Epic Mind Drive',
      paragraph: 'MoneySupermarket.com wanted to celebrate the release of telematics boxes for insurees car’s, by rewarding smarter drivers with more than just cheaper car insurance. I worked as part of the team that delivered an experience, allowing users to drive a car using their mind.',
    }, {
      header: 'Next Gen VR',
      paragraph: 'Merck created a new drug to help MS patients manage their symptoms and wanted to show how it was changing lives. To help users empathise living with the symptoms, the HTC Vive was used with custom made hardware - to create an immersive VR experience that put users inside the life of suffers.'
    }, {
      // header: "Welcome to my portfolio",
      // footer: "Made from React & Redux"
    }, {
      header: 'Caddy Clubhouse',
      paragraph: 'SAP wanted to use data to help golf enthusiasts improve their game during the BMW International Golf Open. I worked as part of a team of developers and designers to create an experience that analysed a users golfing performance in preparation for a session with a professional coach, who used this projection mapped data to mentor players.',
    }, {
      header: 'Hole In The Wall',
      paragraph: 'Krispy Kreme wanted to create a spectacle to celebrate the release of their new Nutty Chocolatta doughnut. I helped bring interactivity to the window display that allowed customers to use their contactless bank cards to pay for the product, bringing the window display to life and ultimately receiving their doughnut through a hole in the wall.',
    }, {
      header: 'What It Means To Be A Maker',
      paragraph: 'This research was focussed on understanding the mental and physical processes that lie at the heart of making. Through the use of various tools, 2 wooden records were created that represented the different aspects of what it means to make.',
    }, {
      header: 'MAIA',
      paragraph: 'ADT wanted to show their brand in a more playful context, by catching ‘petty pilferers’. I developed the electronics and program for a series IOT devices, that took photos of the ‘petty pilferers’ using a camera and sent the images via a 4g connection to the users mobile device.',
    }
  ],
  itemImage: [
    { unscrolled: 'moodtree.png', scrolled: 'moodtree-scrolled.png', clicked: 'moodtreegif.mp4' },
    { unscrolled: 'beer.png', scrolled: 'beer-scrolled.png', clicked: 'beergif.mp4' },
    { unscrolled: 'epic.png', scrolled: 'epic-scrolled.png', clicked: 'epicgif.mp4' },
    { unscrolled: 'merck.png', scrolled: 'merck-scrolled.png', clicked: 'merckgif.mp4' },
    { unscrolled: 'krispy.png', scrolled: 'krispy-scrolled.png', clicked: 'krispy.gif' },
    { unscrolled: 'sap.png', scrolled: 'sap-scrolled.png', clicked: 'sap.gif' },
    { unscrolled: null, scrolled: null, clicked: null },
    { unscrolled: 'maker.png', scrolled: 'maker-scrolled.png', clicked: 'maker.gif' },
    { unscrolled: 'adt.png', scrolled: 'adt-scrolled.png', clicked: 'adt.gif' }
  ],
  itemVideo: [
    {
      videoID: 'moodtree.mp4', // moodtree
      videoLength: 103000
    }, {
      videoID: 'beerpump.mp4', // pay@pump
      videoLength: 64000
    }, {
      videoID: 'epic.mp4', // epic mind drive
      videoLength: 102000
    }, {
      videoID: 'merck.mp4', // merck next gen vr
      videoLength: 114000
    }, {
      // hero text: video not applicable
    }, {
      videoID: 'T19vR9AxUug' // caddy clubhouse
    }, {
      videoID: 'AlvdRkRewvA' // hole in the wall
    }, {
      videoID: '5hHonl2hmiU' // what it means to be a maker
    }, {
      videoID: '36XGBIJLyN4' // MAIA
    }
  ],
  // -370
  itemPosition: [
    { marginLeft: 1, marginTop: 300 },
    { marginLeft: 600, marginTop: 1 },
    { marginLeft: 2700, marginTop: 1 },
    { marginLeft: 3250, marginTop: 300 },
    { null: null },
    { marginLeft: 800, marginTop: 230 },
    { marginLeft: 800, marginTop: 230 },
    { marginLeft: 800, marginTop: 230 },
    { marginLeft: 800, marginTop: 230 },
  ],
  heroFooterText: {
    none: {
      text: 'INTERACTIVE EXPERIENCE & PRODUCT DESIGN SERVICES',
      color: '#7c7c7c'
    },
    centerIcon: {
      text: "Creative technology ideas I've helped bring to life",
      color: '#008f9c'
    },
    centerLeftIcon: {
      text: 'Tell me about your ideas on: hi@jamesmiller.design',
      color: '#1d9c00'
    },
    centerRightIcon: {
      text: 'How I can help launch your ideas with technology',
      color: '#e4bc02'
    }
  },
  heroIcon: {
    centerRightIcon: {
      name360: 'centerRightIcon',
      backgroundColor: '#e4bc02',
      image360: 'tech.png',
      href: '/services',
      target: '_self'
    },
    centerLeftIcon: {
      name360: 'centerLeftIcon',
      backgroundColor: '#1d9c00',
      image360: 'mail.png',
      href: 'mailto:hi@jamesmiller.design',
      target: '_blank'
    }
  },
  heroText: {
    none: {
      text: ['j', 'm'],
      backgroundColor: '#7c7c7c'
    },
    centerLeftIcon: {
      text: ['']
    },
    centerRightIcon: {
      text: ['']
    },
    centerIcon: {
      text: [''],
      backgroundColor: '#008f9c',
      backgroundImage360: 'design.png'
    }
  }
};
