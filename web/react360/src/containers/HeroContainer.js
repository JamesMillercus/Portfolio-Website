import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import { asset, Environment } from 'react-360';
import { store } from './../Store.js';
import config from './../config/config';
import Hero from './../components/locs/Hero/Hero';
import { fetchWebMode } from './../actions';

class HeroContainer extends Component {

  componentWillMount() {
    this.userAgent = navigator.userAgent;
    if (this.props.parentPathName === '/') this.props.fetchWebMode('web');
    // this.webMode = 'webvr'; // comment this in dev
  }

  componentDidMount() {
    Environment.setBackgroundImage(asset('360_world.jpg'), {
      format: '2D',
    });
  }

  logoTextScrolled() {
    if (this.props.webMode === 'webvr') return config.heroFooterText.centerIcon.logoTextScrolledWebVR;
    return config.heroFooterText.centerIcon.logoTextScrolled;
  }

  logoImageScrolled() {
    if (this.props.webMode === 'webvr') return config.heroText.centerIcon.webvrLogoImageScrolled;
    return config.heroText.centerIcon.logoImageScrolled;
  }

  centerLogoIconName() {
    if (this.props.webMode === 'webvr') return config.heroText.centerIcon.webvrCenterLogoIconName;
    return config.heroText.centerIcon.centerLogoIconName;
  }

  href() {
    if (this.props.webMode === 'webvr') return config.heroText.centerIcon.webvrhref;
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
            />
        </Provider>
      </UserAgentProvider>
    );
  }
}

const mapStateToProps = ({ webMode }) => ({ webMode });

function connectWithStore(store, WrappedComponent, ...args) {
  const ConnectedWrappedComponent = connect(...args)(WrappedComponent);
  return function (props) {
    return <ConnectedWrappedComponent {...props} store={store} />;
  };
}

const ConnectedApp = connectWithStore(store, HeroContainer, mapStateToProps, { fetchWebMode });

export default ConnectedApp;
