/*eslint max-len: ["error", { "code": 500 }]*/
//
export default {
  page: 'services',
  itemText: [
    {
      header: 'Consult',
      paragraph: 'Have a technology idea that needs costing up / feasibility checking, or want to figure out what ideas are realistic within your budget? Get in touch and I can assist to achieve your business objectives, within budget and timelines.',
    }, {
      header: 'Visualise',
      paragraph: 'When you have a concept that needs visualising, I can create clean and professional designs for you. I do this using tools from the Adobe Creative Suite such as Photoshop, InDesign, Illustrator and Premiere Pro.',
    }, {
      header: 'Prototype',
      paragraph: 'If you have a visual design which you would like to test prior to investment, I can prototype these quickly for you. I do this using Interactive Design tools such as Sketch and Framer, which auto generates code that can be used in production.',
    }, {
      header: 'Web and Native Apps',
      paragraph: "Once you have a design that you would like to be produced, I can realise your innovative ideas as a website, desktop app, mobile app, virtual reality or augmented reality experience. I do this using a series of 'React' based frameworks: JS, Native, 360 and Viro."
    }, {
      // header: "Welcome to my portfolio",
      // footer: "Made from React & Redux"
    }, {
      header: 'Content Managed Systems',
      paragraph: 'If apps require content to be created by an admin system, I can build a reusable and easy-to-use back end for you. I do this using NodeJS for server/api creation, KeystoneJS as an admin system and Mongo as the database that stores information.',
    }, {
      header: 'Technical Architecture',
      paragraph: 'For large projects that require technical infrastructure, you can leave the hassle of figuring this out to me. I use tools such as Docker, Kubernetes and Rancher - to containerize, automate, deploy and manage applications / databases.',
    }, {
      header: 'Internet Of Things',
      paragraph: 'When an idea needs to be brought to life with sensors and electronics, I can prototype and build this for you. I do this using tools such as Arduino for sensor/actuator control, Raspberry Pi for internet integration and KiCad for printed circuit board design.',
    }, {
      header: 'Blockchain',
      paragraph: 'Be a leader in your industry with blockchain technology and decentralised applications. I can develop this for you using tools such as Ganache/Geth for development, Solidity for smart contract creation and truffle for testing, compiling and deploying smart contracts.',
    }
  ],
  itemImage: [
    { png: 'consult.png', gif: 'consult.gif' },
    { png: 'visualise.png', gif: 'visualise.gif' },
    { png: 'prototype.png', gif: 'prototype.gif' },
    { png: 'apps.png', gif: 'apps.gif' },
    { png: null, gif: null },
    { png: 'cms.png', gif: 'cms.gif' },
    { png: 'architecture.png', gif: 'architecture.gif' },
    { png: 'iot.png', gif: 'iot.gif' },
    { png: 'blockchain.png', gif: 'blockchain.gif' }
  ],
  itemLink: [
    { href: 'https://www.linkedin.com/in/james-miller-b0bb4478/' },
    { href: 'https://www.behance.net/gallery/70821297/Momo-Models' },
    { href: 'https://www.behance.net/gallery/70821953/Caddy-Clubhouse-Interactive-Putting-Experience' },
    { href: 'https://github.com/JamesMillerBlog/serverside-react-boilerplate' },
    { href: null },
    { href: 'https://github.com/JamesMillerBlog/Keystone' },
    { href: 'https://github.com/JamesMillerBlog/Micro-services' },
    { href: 'https://github.com/JamesMillerBlog/beerpump' },
    { href: 'https://github.com/JamesMillerBlog/blockchain' }
  ],
  heroFooterText: {
    none: {
      text: 'INTERACTIVE EXPERIENCE & PRODUCT DESIGN SERVICES',
      color: '#7c7c7c'
    },
    centerIcon: {
      text: 'How I can help launch your ideas with technology',
      color: '#e4bc02'
    },
    centerLeftIcon: {
      text: 'Tell me about your ideas on: hi@jamesmiller.design',
      color: '#1d9c00'
    },
    centerRightIcon: {
      text: "Creative technology projects I've worked on",
      color: '#008f9c'
    },
    webvr: {
      text: 'Experience this website in Web VR',
      color: '#e4bc02'
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
      backgroundImage: 'techIcon.png',
      scrollableHeroIcon: 'webvr',
      scrolledBackgroundImage: 'webvrIcon.png',
      href: '/webvr',
      targer: '_self'
    }
  }
};
