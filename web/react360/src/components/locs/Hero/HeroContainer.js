import React from 'react';
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
