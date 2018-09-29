/*eslint max-len: ["error", { "code": 500 }]*/

export default {
  page: 'services',
  itemText: [
    {
      header: 'Consult',
      paragraph: 'Have a technology idea that needs costing up / feasibility checking, or want to figure out what ideas are realistic within your budget? Get in touch and I can assist to achieve your business objectives, within budget and timelines.',
    }, {
      header: 'Visualise',
      paragraph: 'When you have a concept that needs visualising, I can create clean and professional designs for you. I do this using tools from the Adobe Creative Suite such as Photoshop, InDesign, Illustrator, Premiere Pro and After Effects.',
    }, {
      header: 'Prototype',
      paragraph: 'If you have a visual design which you would like to test prior to investing money into development, I can prototype these quickly for you. I do this using Interactive Design tools such as Sketch and Framer, which auto generates code that can be used to build your final product.',
    }, {
      header: 'Technical Architecture',
      paragraph: 'For large projects that require technical infrastructure, you can leave the hassle of figuring this out to me. I use tools such as Docker, Kubernetes and Rancher - to containerize, automate, deploy and manage applications / databases.',
    }, {
      // header: "Welcome to my portfolio",
      // footer: "Made from React & Redux"
    }, {
      header: 'Web and Native Apps',
      paragraph: "Once you have a design that you would like to be produced, I can realise your innovative ideas as a website, desktop app, mobile app, virtual reality or augmented reality experience. I do this using a series of 'React' based frameworks such as React: JS, Native, 360 and Viro."
    }, {
      header: 'Content Managed Systems',
      paragraph: 'If apps require content to be created by an admin system, I can build a reusable and easy-to-use back end for you. I do this using NodeJS for server/api creation, KeystoneJS as an admin system and Mongo as the database that stores information.',
    }, {
      header: 'Internet Of Things',
      paragraph: 'When an idea needs to be brought to life with sensors and electronics, I can prototype and build this for you. I do this using tools such as Arduino for sensor/actuator control, Raspberry Pi for internet integration and KiCad for printed circuit board design/production.',
    }, {
      header: 'Blockchain',
      paragraph: 'If you are looking to lead your industry with blockchain technology - then I can help you build a decentralised app. I do this using tools such as Ganache/Geth for private development, Solidity for Ethereum smart contract creation and truffle for testing, compiling and deploying smart contracts.',
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
      text: 'different ways I can help launch your ideas',
      color: '#e4bc02'
    },
    centerLeftIcon: {
      text: 'tell me about your ideas on: hi@jamesmiller.design',
      color: '#1d9c00'
    },
    centerRightIcon: {
      text: "ideas I've helped create on behalf of businesses",
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
