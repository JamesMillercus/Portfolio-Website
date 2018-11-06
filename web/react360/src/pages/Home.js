import React from 'react';
import { asset, Environment, View } from 'react-360';
import { connect } from 'react-redux';
import { compose } from 'redux';
import HeroContainer from './../components/locs/Hero/HeroContainer';
// import ItemContainer from './../components/locs/Item/ItemContainer';
import config from './../config/homeConfig';
import Item from './../components/locs/Item/Item';
import getDevice from './../components/hocs/getDevice';

// import VideoContainer from './../containers/MobileVideoContainer';

class Home extends React.Component {

  componentDidMount() {
    Environment.setBackgroundImage(asset('360_world.jpg'), {
      format: '2D',
    });
  }

  componentDidUpdate() {
    const { activeItem } = this.props;
    if (activeItem === 'hidden') {
      Environment.setBackgroundImage(asset('360_world.jpg'), {
        format: '2D',
      });
    } else Environment.clearBackground();
  }

  items() {
    const itemArr = [];
    for (let x = 0; x < 4; x++) {
        itemArr.push(
          <Item
            key={x}
            itemNumber={x}
            page={config.page}
            unscrolledImage={config.itemImage[x].unscrolled}
            scrolledImage={config.itemImage[x].scrolled}
            clickedImage={config.itemImage[x].clicked}
            textHeader={config.itemText[x].header}
            textBody={config.itemText[x].paragraph}
            marginLeft={config.itemPosition[x].marginLeft}
            marginTop={config.itemPosition[x].marginTop}
            videoID={config.itemVideo[x].videoID}
            videoLength={config.itemVideo[x].videoLength}
            youtube={config.itemVideo[x].youtube}
          />
        );
    }
    return itemArr;
  }

  content() {
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
          logoImageScrolled={config.heroText.centerIcon.logoImageScrolled} //
          logoTextScrolled={config.heroFooterText.centerIcon.logoTextScrolled} //
          centerLogoIconName={config.heroText.centerIcon.centerLogoIconName} //
          centerHref={config.heroText.centerIcon.href} //
          centerLeftIconName={config.heroIcon.centerLeftIcon.name360}
          centerLeftIconImage={config.heroIcon.centerLeftIcon.image360}
          centerLeftIconHref={config.heroIcon.centerLeftIcon.href}
          centerRightIconName={config.heroIcon.centerRightIcon.name360}
          centerRightIconImage={config.heroIcon.centerRightIcon.image360}
          centerRightIconHref={config.heroIcon.centerRightIcon.href}
        />
        {this.items()}
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

const mapStateToProps = ({ activeItem }) => ({ activeItem });

// export default connect(mapStateToProps, null)(Home);

export default compose(getDevice, connect(mapStateToProps, null))(Home);
// export default Home;
