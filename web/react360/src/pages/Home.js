import React from 'react';
import HeroContainer from './../components/locs/Hero/HeroContainer';
import config from './../config/homeConfig';

export default class Home extends React.Component {
  render() {
    return (
      <HeroContainer
        centerLeftIconName={config.heroIcon.centerLeftIcon.name}
        centerLeftIconImage={config.heroIcon.centerLeftIcon.image}
        centerLeftIconHref={config.heroIcon.centerLeftIcon.href}
        centerRightIconName={config.heroIcon.centerRightIcon.name}
        centerRightIconImage={config.heroIcon.centerRightIcon.image}
        centerRightIconHref={config.heroIcon.centerRightIcon.href}
      />
    );
  }
}
