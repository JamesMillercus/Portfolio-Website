import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { Redirect } from 'react-router';
import getDevice from './../../components/hocs/getDevice';
import getBrowser from './../../components/hocs/getBrowser';
import getOSVersion from './../../components/hocs/getOSVersion';
import getNoScript from './../../components/hocs/getNoScript';
import GridContainer from './../../components/locs/GridContainer/GridContainer';
import homePageConfig from './assets/config/homePageConfig';
import {
  fetchUpdateUrl, fetchScrolledItem, fetchScrolledHeroIcon, fetchContent, fetchHeroKeyPress
} from './../../actions';

class Home extends Component {
  componentWillMount() {
    this.props.fetchScrolledItem(null);
    this.props.fetchScrolledHeroIcon('none');
    this.props.fetchContent(homePageConfig);
    this.props.fetchUpdateUrl(null);
    this.props.fetchHeroKeyPress(false);
  }

  /*
    IF ON OCULUS BROWSER, REDIRECT TO WEBVR
  */

  renderPage() {
    // if (this.props.loadWebVr === true && this.props.deviceType !== 'laptop') return <Redirect push to={'/webvr'} />;
    return <GridContainer />;
  }

  render() {
    return this.renderPage();
  }
}

export default {
  // take props from admins and pass them into require Auth
  component: compose(
    getDevice, getOSVersion, getBrowser, getNoScript,
    connect(null, {
      fetchUpdateUrl, fetchScrolledItem, fetchScrolledHeroIcon, fetchContent, fetchHeroKeyPress
    })
  )(Home)
};
