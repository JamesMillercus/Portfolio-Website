import React from 'react';
import { asset, Environment, View } from 'react-360';
import HeroContainer from './../components/locs/Hero/HeroContainer';
import ItemContainer from './../components/locs/Item/ItemContainer';
import config from './../config/homeConfig';
import VideoContainer from './../containers/VideoContainer';

export default class Home extends React.Component {
  componentDidMount() {
    Environment.setBackgroundImage(asset('360_world.jpg'), {
      format: '2D',
    });
  }

  render() {
    return (
      <View>
        <HeroContainer
          textNoScroll={config.heroFooterText.none.text}
          textColorNoScroll={config.heroFooterText.none.color}
          textScrollHero={config.heroFooterText.centerIcon.text}
          textColorScrollHero={config.heroFooterText.centerIcon.color}
          textScrollCenterLeftIcon={config.heroFooterText.centerLeftIcon.text}
          textColorScrollCenterLeftIcon={config.heroFooterText.centerLeftIcon.color}
          textScrollCenterRightIcon={config.heroFooterText.centerRightIcon.text}
          textColorScrollCenterRightIcon={config.heroFooterText.centerRightIcon.color}
          logoImage={config.heroText.centerIcon.backgroundImage360}
          centerLeftIconName={config.heroIcon.centerLeftIcon.name360}
          centerLeftIconImage={config.heroIcon.centerLeftIcon.image360}
          centerLeftIconHref={config.heroIcon.centerLeftIcon.href}
          centerRightIconName={config.heroIcon.centerRightIcon.name360}
          centerRightIconImage={config.heroIcon.centerRightIcon.image360}
          centerRightIconHref={config.heroIcon.centerRightIcon.href}
        />

        <ItemContainer />
      </View>
    );
  }
}
