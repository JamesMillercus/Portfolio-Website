// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { Math as VRMath, ReactInstance, Surface, Module } from 'react-360-web';
import SimpleRaycaster from 'simple-raycaster';

const pathname = parent.document.location.pathname;

function init(bundle, parent, options = {}) {
  // const MobileVideo = new Surface(0, 0, Surface.SurfaceShape.Flat);

  // const cameraDirection = [0, 0, -1];

  // class MobileVideoModule extends Module {
  //   constructor() {
  //     super('VideoModule'); // Makes this module available at NativeModules.MyModule
  //     this.itemNumber = null;
  //   }
  //   showVideo(itemNumber) {
  //     if (itemNumber) {
  //       this.itemNumber = itemNumber;
  //       console.log('itemNumber');
  //       console.log(itemNumber);
  //     } else {
  //       console.log('itemNumber');
  //       console.log(this.itemNumber);
  //     }
  //     // MobileVideo.resize(1020, 560);
  //     // r360.controls.clearRaycasters();
  //     // r360.compositor.setBackground(null);
  //     // console.log('this.props.itemNumber');
  //     // console.log(this.props.itemNumber);
  //   }
  // }

  // const cameraDirection = [0, 0, -1];
  // const reticleSurface = new Surface(50, 50, Surface.SurfaceShape.Flat);

  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    assetRoot: './src/static_assets/',
    // nativeModules: [
    //   new MobileVideoModule(),
    // ],
    // frame: () => {
    //   const cameraQuat = r360.getCameraQuaternion();
    //   cameraDirection[0] = 0;
    //   cameraDirection[1] = 0;
    //   cameraDirection[2] = -1;
    // //   // cameraDirection will point out from the view of the camera,
    // //   // we can use it to compute surface angles
    //   VRMath.rotateByQuaternion(cameraDirection, cameraQuat);
    //   const cx = cameraDirection[0];
    //   const cy = cameraDirection[1];
    //   const cz = cameraDirection[2];
    //
    //   const horizAngle = Math.atan2(cx, -cz);
    //   const vertAngle = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));
    //
    //   reticleSurface.setAngle(horizAngle, vertAngle);
    // },
    ...options,
  }
);

  const heroSurface = new Surface(700, 400, Surface.SurfaceShape.Flat);
  heroSurface.setAngle(0, 0.1);

  r360.renderToSurface(
    r360.createRoot('HeroContainer', { parentPathName: pathname }),
    heroSurface
  );

  const moodTreeSurface = new Surface(800, 400, Surface.SurfaceShape.Flat);
  moodTreeSurface.setAngle(1.2, 0.1);
  r360.renderToSurface(
    r360.createRoot('ItemContainer', { itemNumber: 0 }),
    moodTreeSurface
  );

  const epicSurface = new Surface(800, 400, Surface.SurfaceShape.Flat);
  epicSurface.setAngle(5.1, 0.1);
  r360.renderToSurface(
    r360.createRoot('ItemContainer', { itemNumber: 2 }),
    epicSurface
  );

  const beerSurface = new Surface(800, 400, Surface.SurfaceShape.Flat);
  beerSurface.setAngle(2.5, 0.1);
  r360.renderToSurface(
    r360.createRoot('ItemContainer', { itemNumber: 1 }),
    beerSurface
  );

  const merckSurface = new Surface(800, 400, Surface.SurfaceShape.Flat);
  merckSurface.setAngle(3.8, 0.1);
  r360.renderToSurface(
    r360.createRoot('ItemContainer', { itemNumber: 3 }),
    merckSurface
  );

  // r360.renderToSurface(
  //   r360.createRoot('ReticleContainer', { parentPathName: pathname }),
  //   reticleSurface
  // );

  // r360.renderToSurface(r360.createRoot('MobileVideoContainer'), MobileVideo);

  // const player = r360.compositor.createVideoPlayer('myplayer');

  // player.setSource('./src/static_assets/moodtree.mp4', '2D');
  // r360.compositor.setBackgroundVideo('myplayer');
  // player.play();
  // player.setMuted(false);

  if (pathname === '/webvr' || !('ontouchstart' in window)) r360.controls.clearRaycasters();
  r360.controls.addRaycaster(SimpleRaycaster);
  r360.compositor.setCursorVisibility('visible');
}

window.React360 = { init };

React360.init(
  './index.bundle?platform=vr&dev=true',
  document.getElementById('root')
);
