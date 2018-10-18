import React from 'react';
import { AppRegistry } from 'react-360';
import Hero from './Hero';

export default class HeroContainer extends React.Component {
  render() {
    return (
      <Hero
        centerLeftIconName={this.props.centerLeftIconName}
        centerLeftIconImage={this.props.centerLeftIconImage}
        centerLeftIconHref={this.props.centerLeftIconHref}
        centerRightIconName={this.props.centerRightIconName}
        centerRightIconImage={this.props.centerRightIconImage}
        centerRightIconHref={this.props.centerRightIconHref}
      />
    );
  }
}

// const heroSurface = new Surface(600, /* width */ 300, /* height */ Surface.SurfaceShape.Cylinder /* shape */);
// // Render your app content to the default cylinder surface
// r360.renderToSurface(
//   r360.createRoot('HeroContainer', { /* initial props */ }),
//   heroSurface
// );

// console.log(window.React360);

AppRegistry.registerComponent('HeroContainer', () => HeroContainer);
