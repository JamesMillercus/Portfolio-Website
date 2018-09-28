/*eslint max-len: ["error", { "code": 500 }]*/

export default {
  page: 'tech',
  itemText: [
    {
      header: 'Consult',
      paragraph: 'D&AD wanted to promote social activity during their design festival. I created the electronics for an installation that utilised Twitter’s API and Stanfords Natural Language parser, to analyse live tweets on the events ‘#’. A keyword and colour was displayed on each of the trees leaves, based on that tweets collected sentiment.',
    }, {
      header: 'Visualise',
      paragraph: 'Barclaycard wanted to explore how their contactless technology could help reduce queues at bars on nights out. Using their contactless card payment system, I worked as part of the team that designed a prototype beer pump, that was automated to accurately pour a pint of beer once a successful payment had been received.',
    }, {
      header: 'Prototype',
      paragraph: 'Krispy Kreme wanted to create a spectacle to celebrate the release of their new Nutty Chocolatta doughnut. I helped bring interactivity to the window display that allowed customers to use their contactless bank cards to pay for the product, bringing the window display to life and ultimately receiving their doughnut through a hole in the wall.',
    }, {
      header: 'Technical Architecture',
      paragraph: 'SAP wanted to use data to help golf enthusiasts improve their game during the BMW International Golf Open. I worked as part of a team of developers and designers to create an experience that analysed a users golfing performance in preparation for a session with a professional coach, who used this projection mapped data to mentor players.',
    }, {
      // header: "Welcome to my portfolio",
      // footer: "Made from React & Redux"
    }, {
      header: 'Web and Native Apps',
      paragraph: 'Merck created a new drug to help MS patients manage their symptoms and wanted to show how it was changing lives. To help users empathise living with the symptoms, the HTC Vive was used with custom made hardware - to create an immersive VR experience that put users inside the life of suffers.'
    }, {
      header: 'Content Managed Systems',
      paragraph: 'MoneySupermarket.com wanted to celebrate the release of telematics boxes for insurees car’s, by rewarding smarter drivers with more than just cheaper car insurance. I worked as part of the team that delivered an experience, allowing users to drive a car using their mind.',
    }, {
      header: 'Internet Of Things',
      paragraph: 'This research was focussed on understanding the mental and physical processes that lie at the heart of making. Through the use of various tools, 2 wooden records were created that represented the different aspects of what it means to make.',
    }, {
      header: 'Blockchain',
      paragraph: 'ADT wanted to show their brand in a more playful context, by catching ‘petty pilferers’. I developed the electronics and program for a series IOT devices, that took photos of the ‘petty pilferers’ using a camera and sent the images via a 4g connection to the users mobile device.',
    }
  ],
  itemImage: [
    { png: 'consult.png', gif: 'consult.gif' },
    { png: 'visualise.png', gif: 'visualise.gif' },
    { png: 'prototype.png', gif: 'prototype.gif' },
    { png: 'architecture.png', gif: 'architecture.gif' },
    { png: null, gif: null },
    { png: 'apps.png', gif: 'apps.gif' },
    { png: 'cms.png', gif: 'cms.gif' },
    { png: 'iot.png', gif: 'iot.gif' },
    { png: 'blockchain.png', gif: 'blockchain.gif' }
  ],
  itemLink: [
    { href: 'mailto:hi@jamesmiller.design' },
    { href: 'https://github.com/JamesMillercus/' },
    { href: 'https://github.com/JamesMillercus/' },
    { href: 'https://github.com/JamesMillercus/' },
    { href: null },
    { href: 'https://github.com/JamesMillercus/' },
    { href: 'https://github.com/JamesMillercus/' },
    { href: 'https://github.com/JamesMillercus/' },
    { href: 'https://github.com/JamesMillercus/' }
  ],
  heroFooterText: {
    none: {
      text: 'i bring ideas to life with design, code & hardware',
      color: '#7c7c7c'
    },
    centerIcon: {
      text: 'launch ideas as AR, VR, desktop, mobile or web apps',
      color: '#e4bc02'
    },
    centerLeftIcon: {
      text: 'tell me about your ideas on: hi@jamesmiller.design',
      color: '#1d9c00'
    },
    centerRightIcon: {
      text: 'prototype ideas as products or digital experiences',
      color: '#008f9c'
    }
  },
  heroIcon: {
    centerRightIcon: {
      backgroundColor: '#008f9c',
      backgroundSize: '100%',
      backgroundPosition: '50% 0',
      scrolledBackgroundPosition: '50% 107%',
      scrolledBackgroundSize: '90%',
      image: 'designIcon.png',
      href: '/',
      target: '_self'
    },
    centerLeftIcon: {
      backgroundColor: '#1d9c00',
      image: 'mailIcon.png',
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
      backgroundColor: '#e4bc02',
      backgroundImage: 'techIcon.png'
    }
  }
};
