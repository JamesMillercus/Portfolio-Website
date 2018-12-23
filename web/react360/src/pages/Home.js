import React from 'react';
import { asset, Environment, View } from 'react-360';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Hero from './../components/locs/Hero/Hero';
// import ItemContainer from './../components/locs/Item/ItemContainer';
import config from './../config/homeConfig';
// import Item from './../components/locs/Item/Item';
import getDevice from './../components/hocs/getDevice';

// import VideoContainer from './../containers/MobileVideoContainer';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.webMode = 'webvr';
    // this.webMode = 'webvr'; // comment in production
  }

  componentDidMount() {
    Environment.setBackgroundImage(asset('360_world.jpg'), {
      format: '2D',
    });

    if (this.props.parentPathName === '/webvr') this.webMode = 'webvr'; // comment this in dev
    else this.webMode = 'web'; // comment this in dev
    // this.webMode = 'web'; // comment this in production
  }

  componentDidUpdate() {
    const { activeItem } = this.props;
    if (activeItem === 'hidden') {
      Environment.setBackgroundImage(asset('360_world.jpg'), {
        format: '2D',
      });
    } else Environment.clearBackground();
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

  content() {
    return (
      <View>
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
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.content()}
      </View>
    );
  }
}

const mapStateToProps = ({ activeItem, webMode }) => ({ activeItem, webMode });

// export default connect(mapStateToProps, null)(Home);

export default compose(getDevice, connect(mapStateToProps, null))(Home);
// export default Home;
