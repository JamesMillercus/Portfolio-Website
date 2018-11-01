// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { Math as VRMath, ReactInstance, Surface, Module } from 'react-360-web';
import SimpleRaycaster from 'simple-raycaster';

function init(bundle, parent, options = {}) {
  const MobileVideo = new Surface(0, 0, Surface.SurfaceShape.Flat);

  const cameraDirection = [0, 0, -1];

  class MobileVideoModule extends Module {
    constructor() {
      super('VideoModule'); // Makes this module available at NativeModules.MyModule
      this.itemNumber = null;
    }
    showVideo(itemNumber) {
      if (itemNumber) {
        this.itemNumber = itemNumber;
        console.log('itemNumber');
        console.log(itemNumber);
      } else {
        console.log('itemNumber');
        console.log(this.itemNumber);
      }
      // MobileVideo.resize(1020, 560);
      // r360.controls.clearRaycasters();
      // r360.compositor.setBackground(null);
      // console.log('this.props.itemNumber');
      // console.log(this.props.itemNumber);
    }
  }

  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    assetRoot: './src/static_assets/',
    nativeModules: [
      new MobileVideoModule(),
    ],
    frame: () => {
    //   const cameraQuat = r360.getCameraQuaternion();
    //   cameraDirection[0] = 0;
    //   cameraDirection[1] = 0;
    //   cameraDirection[2] = -1;
    //   // cameraDirection will point out from the view of the camera,
    //   // we can use it to compute surface angles
    //   VRMath.rotateByQuaternion(cameraDirection, cameraQuat);
    //   const cx = cameraDirection[0];
    //   const cy = cameraDirection[1];
    //   const cz = cameraDirection[2];
    //   const horizAngle = Math.atan2(cx, -cz);
    //   const vertAngle = Math.asin(cy / Math.sqrt((cx * cx) + (cy * cy) + (cz * cz)));
    //   Video.setAngle(horizAngle, vertAngle);
    },
    ...options,
  }
);

  const appSurface = new Surface(4096, 720, Surface.SurfaceShape.Cylinder);
  appSurface.setAngle(0, -0.6);
  r360.renderToSurface(
    r360.createRoot('App', { /* initial props */ }),
    appSurface
  );

  r360.renderToSurface(r360.createRoot('MobileVideoContainer'), MobileVideo);

  // const player = r360.compositor.createVideoPlayer('myplayer');

  // player.setSource('./src/static_assets/moodtree.mp4', '2D');
  // r360.compositor.setBackgroundVideo('myplayer');
  // player.play();
  // player.setMuted(false);


  r360.controls.clearRaycasters();
  r360.controls.addRaycaster(SimpleRaycaster);
  r360.compositor.setCursorVisibility('visible');
}

window.React360 = { init };

React360.init(
  './index.bundle?platform=vr&dev=true',
  document.getElementById('root')
);
