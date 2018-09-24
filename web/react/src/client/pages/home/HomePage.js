import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import getDevice from './../../components/hocs/getDevice';
import getBrowser from './../../components/hocs/getBrowser';
import getOSVersion from './../../components/hocs/getOSVersion';
import GridContainer from './../../components/locs/GridContainer/GridContainer';
import homePageConfig from './assets/config/homePageConfig';
import {
  fetchContent, fetchUpdateUrl, fetchScrolledItem, fetchScrolledHeroIcon
} from './../../actions';

class Home extends Component {

  componentWillMount() {
    this.props.fetchScrolledItem(null);
    this.props.fetchScrolledHeroIcon('none');
    this.props.fetchContent(homePageConfig);
    this.props.fetchUpdateUrl(null);
  }

  render() {
    return <GridContainer />;
  }
}

export default {
  // take props from admins and pass them into require Auth
  component: compose(
    getDevice, getOSVersion, getBrowser,
    connect(null, {
      fetchContent, fetchUpdateUrl, fetchScrolledItem, fetchScrolledHeroIcon
    })
  )(Home)
};
