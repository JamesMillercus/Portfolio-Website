import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';

export default (req, store, content) => {
  let headerTags;
  let scripts;

  if (content) {
    // ssr
    const helmet = Helmet.renderStatic();
    headerTags = `${helmet.title.toString()}
                  ${helmet.meta.toString()}`;

    scripts = `<script>
                  window.INITIAL_STATE = ${serialize(store.getState())}
               </script>
               <script src ="/js/vendors~bundle.js"></script>
               <script src ="/js/bundle.js"></script>`;
  } else {
    // csr
    headerTags =
    `<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
     <style>
      body {margin: 0;}
      div {cursor: none !important;}
     </style>`;
    scripts = `<script src ="/js/vendors~bundle.js"></script>
               <script src ="/js/vendors~csr_bundle.js"></script>
               <script src ="/js/csr_bundle.js"></script>`;
  }
  // returns an object that contains tags from loaded components
  // load front end js
  return `
    <html>
      <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-126813701-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-126813701-1');
        </script>
        ${headerTags}
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro|Baloo+Bhaina" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="/css/vendors.bundle.css">
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
      </head>
      <body>
        <div id ="root">${content}</div>
        ${scripts}
      </body>
    </html>
  `;
};
