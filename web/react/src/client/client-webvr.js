// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { Math as VRMath, ReactInstance, Surface, Module } from 'react-360-web';
import SimpleRaycaster from 'simple-raycaster';


// function init(bundle, parent, options = {}) {
//   const Video = new Surface(0, 0, Surface.SurfaceShape.Flat);
//
//   const cameraDirection = [0, 0, -1];
//
//   class VideoModule extends Module {
//     constructor() {
//       super('VideoModule'); // Makes this module available at NativeModules.MyModule
//     }
//     resizeVideo(width, height) {
//       Video.resize(width, height);
//     }
//   }
//
//   const r360 = new ReactInstance(bundle, parent, {
//     // Add custom options here
//     fullScreen: true,
//     assetRoot: './src/static_assets/',
//     nativeModules: [
//       new VideoModule(),
//     ],
//     frame: () => {
//       const cameraQuat = r360.getCameraQuaternion();
//       cameraDirection[0] = 0;
//       cameraDirection[1] = 0;
//       cameraDirection[2] = -1;
//       // cameraDirection will point out from the view of the camera,
//       // we can use it to compute surface angles
//       VRMath.rotateByQuaternion(cameraDirection, cameraQuat);
//       const cx = cameraDirection[0];
//       const cy = cameraDirection[1];
//       const cz = cameraDirection[2];
//       const horizAngle = Math.atan2(cx, -cz);
//       const vertAngle = Math.asin(cy / Math.sqrt((cx * cx) + (cy * cy) + (cz * cz)));
//       Video.setAngle(horizAngle, vertAngle);
//       // Video.resize(200, 200);
//     },
//     ...options,
//   }
// );
//
//
//   r360.renderToSurface(
//     r360.createRoot('App', { /* initial props */ }),
//     new Surface(4000, 1000, Surface.SurfaceShape.Cylinder /* shape */)
//   );
//   r360.renderToSurface(r360.createRoot('VideoContainer'), Video);
//
//   r360.controls.clearRaycasters();
//   r360.controls.addRaycaster(SimpleRaycaster);
//   r360.compositor.setCursorVisibility('visible');
// }
//
// window.React360 = { init };

// React360.init(
//   './r360/csr.js',
//   document.getElementById('root')
// );
