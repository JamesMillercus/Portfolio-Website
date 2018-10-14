// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Location, Surface} from 'react-360-web';
import SimpleRaycaster from "simple-raycaster";


const heroSurface = new Surface(600, /* width */ 300, /* height */ Surface.SurfaceShape.Cylinder /* shape */ );

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    cursorVisibility: "visible",
    ...options,
  });

  // Create a location two meters in front of the user, and one meter down
  const location = new Location([0, -.5, -2]);

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('Hero', { /* initial props */ }),
    heroSurface
  );

  // Load the initial environment
  // r360.compositor.setBackground('#fff');
  // r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
  r360.controls.clearRaycasters();
  r360.controls.addRaycaster(SimpleRaycaster);
}

window.React360 = {init};
