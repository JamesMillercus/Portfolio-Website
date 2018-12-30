import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import { asset, Environment } from 'react-360';
import { store } from './../Store.js';
import config from './../config/homeConfig';
import Hero from './../components/locs/Hero/Hero';

export default class HeroContainer extends Component {

  componentWillMount() {
    this.webMode = 'webvr';
    this.userAgent = navigator.userAgent;
  }

  componentDidMount() {
    Environment.setBackgroundImage(asset('360_world.jpg'), {
      format: '2D',
    });

    if (this.props.parentPathName === '/webvr') this.webMode = 'webvr'; // comment this in dev
    else this.webMode = 'web'; // comment this in dev
    // this.webMode = 'web'; // comment this in production
  }

  logoTextScrolled() {
    if (this.webMode === 'webvr') return config.heroFooterText.centerIcon.logoTextScrolledWebVR;
    return config.heroFooterText.centerIcon.logoTextScrolled;
  }

  logoImageScrolled() {
    if (this.webMode === 'webvr') return config.heroText.centerIcon.webvrLogoImageScrolled;
    return config.heroText.centerIcon.logoImageScrolled;
  }

  centerLogoIconName() {
    if (this.webMode === 'webvr') return config.heroText.centerIcon.webvrCenterLogoIconName;
    return config.heroText.centerIcon.centerLogoIconName;
  }

  href() {
    if (this.webMode === 'webvr') return config.heroText.centerIcon.webvrhref;
    return config.heroText.centerIcon.href;
  }

  render() {
    return (
      <UserAgentProvider ua={this.userAgent} store={store}>
        <Provider store={store}>
            <Hero
              textNoScroll={config.heroFooterText.none.text}
              textColorNoScroll={config.heroFooterText.none.color}
              textScrollHero={config.heroFooterText.centerIcon.text}
              textColorScrollHero={config.heroFooterText.centerIcon.color}
              textScrollCenterLeftIcon={config.heroFooterText.centerLeftIcon.text}
              textColorScrollCenterLeftIcon={config.heroFooterText.centerLeftIcon.color}
              textScrollCenterRightIcon={config.heroFooterText.centerRightIcon.text}
              textColorScrollCenterRightIcon={config.heroFooterText.centerRightIcon.color}
              logoImage={config.heroText.centerIcon.backgroundImage360}
              logoImageScrolled={this.logoImageScrolled()} //
              logoTextScrolled={this.logoTextScrolled()} //
              centerLogoIconName={this.centerLogoIconName()} //
              centerHref={this.href()} //
              centerLeftIconName={config.heroIcon.centerLeftIcon.name360}
              centerLeftIconImage={config.heroIcon.centerLeftIcon.image360}
              centerLeftIconHref={config.heroIcon.centerLeftIcon.href}
              centerRightIconName={config.heroIcon.centerRightIcon.name360}
              centerRightIconImage={config.heroIcon.centerRightIcon.image360}
              centerRightIconHref={config.heroIcon.centerRightIcon.href}
              webMode={this.webMode}
            />
        </Provider>
      </UserAgentProvider>
    );
  }
}
