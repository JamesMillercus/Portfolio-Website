// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Location, Surface } from 'react-360-web';
import SimpleRaycaster from 'simple-raycaster';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  // Create a location two meters in front of the user, and one meter down
  const location = new Location([0, -0.5, -2]);

  r360.renderToSurface(
    r360.createRoot('App', { /* initial props */ }),
    new Surface(4700, 1000, Surface.SurfaceShape.Cylinder /* shape */)
  );

  r360.controls.clearRaycasters();
  r360.controls.addRaycaster(SimpleRaycaster);
  r360.compositor.setCursorVisibility('visible');
}

window.React360 = { init };

React360.init(
  './src/index.bundle?platform=vr&dev=true',
  document.getElementById('container'),
  {
    assetRoot: './src/static_assets/',
  }
);

// export default react360;