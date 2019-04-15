import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { UserAgentProvider, UserAgent } from '@quentin-sommer/react-useragent';
import { asset, Environment } from 'react-360';
import { store } from './../Store.js';
import config from './../config/config';
import Hero from './../components/locs/Hero/Hero';
import { fetchWebMode, fetchWebBrowser } from './../actions';

class HeroContainer extends Component {

  componentWillMount() {
    this.userAgent = navigator.userAgent;
  }

  componentDidMount() {
    Environment.setBackgroundImage(asset('360_world.jpg'), {
      format: '2D',
    });
  }

  logoTextScrolled() {
    const { webMode } = this.props;
    if (webMode === 'webvr') return config.heroFooterText.centerIcon.logoTextScrolledWebVR;
    else if (webMode === 'mobile-webvr') return config.heroFooterText.centerIcon.logoTextScrolledMobileWebVR;
    return config.heroFooterText.centerIcon.logoTextScrolled;
  }

  logoImageScrolled() {
    const { webMode } = this.props;
    if (webMode === 'webvr') return config.heroText.centerIcon.webvrLogoImageScrolled;
    else if (webMode === 'mobile-webvr') return config.heroText.centerIcon.mobileWebvrLogoImageScrolled;
    return config.heroText.centerIcon.logoImageScrolled;
  }

  centerLogoIconName() {
    const { webMode } = this.props;
    if (webMode === 'webvr') return config.heroText.centerIcon.webvrCenterLogoIconName;
    else if (webMode === 'mobile-webvr') return config.heroText.centerIcon.mobileWebvrCenterLogoIconName;
    return config.heroText.centerIcon.centerLogoIconName;
  }

  href() {
    const { webMode } = this.props;
    if (webMode === 'webvr') return config.heroText.centerIcon.webvrhref;
    else if (webMode === 'mobile-webvr') return config.heroText.centerIcon.mobilewebvrhref;
    return config.heroText.centerIcon.href;
  }

  vrExperience(parser) {
    const deviceType = parser.getDevice().type;
    const browser = parser.getBrowser().name;
    this.props.fetchWebBrowser(browser);
    if (navigator.getVRDisplays) {
      // if vr display is detected
      navigator.getVRDisplays().then(function (displays) {
        // render scene for webvr (headset experience)
        if (displays.length > 0) this.props.fetchWebMode('webvr');
        // else render normal expeirence (laptop)
        else this.props.fetchWebMode('webvr');
        // else this.props.fetchWebMode('web');
      });
      // if webvr is not enabled and pathname is '/', render normal experience (mobile)
    } else if (browser === 'Oculus Browser') {
      this.props.fetchWebMode('webvr');
    } else if (deviceType === 'mobile' || deviceType === 'tablet') {
      if (this.props.parentPathName === '/' || this.props.parentPathName === '/index.html') this.props.fetchWebMode('web');
      // else if pathame isn't '/', render webvr experience (mobile)
      else this.props.fetchWebMode('mobile-webvr');
      // this.webMode = 'webvr'; // comment this in dev
    }
  }

  render() {
    return (
      <UserAgentProvider ua={this.userAgent} store={store}>
        <Provider store={store}>
          <UserAgent returnFullParser>
              {parser => (
                <Hero
                  vrExperience={this.vrExperience(parser)}
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
              )}
          </UserAgent>
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

const ConnectedApp = connectWithStore(store, HeroContainer, mapStateToProps, { fetchWebMode, fetchWebBrowser });

export default ConnectedApp;
