import React from 'react';
import Hero from './Hero';

export default class HeroContainer extends React.Component {
  render() {
    return (
      <Hero
        textNoScroll={this.props.textNoScroll}
        textColorNoScroll={this.props.textColorNoScroll}
        textScrollHero={this.props.textScrollHero}
        textColorScrollHero={this.props.textColorScrollHero}
        textScrollCenterLeftIcon={this.props.textScrollCenterLeftIcon}
        textColorScrollCenterLeftIcon={this.props.textColorScrollCenterLeftIcon}
        textScrollCenterRightIcon={this.props.textScrollCenterRightIcon}
        textColorScrollCenterRightIcon={this.props.textColorScrollCenterRightIcon}
        logoImage={this.props.logoImage}
        logoImageScrolled={this.props.logoImageScrolled} //
        logoTextScrolled={this.props.logoTextScrolled} //
        centerLogoIconName={this.props.centerLogoIconName} //
        centerHref={this.props.centerHref} //
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
