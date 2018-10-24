import React from 'react';
import { asset, Environment, View } from 'react-360';
import HeroContainer from './../components/locs/Hero/HeroContainer';
import ItemContainer from './../components/locs/Item/ItemContainer';
import config from './../config/homeConfig';


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
          centerLeftIconName={config.heroIcon.centerLeftIcon.name}
          centerLeftIconImage={config.heroIcon.centerLeftIcon.image}
          centerLeftIconHref={config.heroIcon.centerLeftIcon.href}
          centerRightIconName={config.heroIcon.centerRightIcon.name}
          centerRightIconImage={config.heroIcon.centerRightIcon.image}
          centerRightIconHref={config.heroIcon.centerRightIcon.href}
        />

        <ItemContainer />
      </View>
    );
  }
}
