import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';

export default (req, store, rawContent) => {
  let headerTags;
  let scripts;
  let content;

  if (rawContent) {
    // ssr
    const helmet = Helmet.renderStatic();
    headerTags = `${helmet.title.toString()}
                  ${helmet.meta.toString()}`;

    scripts = `<script>
                  window.INITIAL_STATE = ${serialize(store.getState())}
               </script>
               <script src ="/js/vendors.js"></script>
               <script src ="/js/bundle.js"></script>`;
    content = rawContent;
  } else {
    // csr
    headerTags =
    '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">';

    scripts = `<script src ="/js/vendors.js"></script>
               <script src ="/js/csr_bundle.js"></script>`;

     /* CREATE LOGIC FOR DETERMINING IF:
      1. is Laptop or headset webvr
      2. is Mobile webvr
      3. then push that result to the webMode reducer
     */

    content = `
      <div> </div>
      <script>
        var vrDisplay;
        if(navigator.getVRDisplays) {
          navigator.getVRDisplays().then(function(displays) {
            if(displays.length > 0) window.INITIAL_STATE = {vrDisplays: JSON.stringify(displays[0].displayName)};
            else window.INITIAL_STATE = ${serialize({ vrDisplays: null })}
          });
        } else window.INITIAL_STATE = ${serialize({ vrDisplays: null })}
      </script>
    `;
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
