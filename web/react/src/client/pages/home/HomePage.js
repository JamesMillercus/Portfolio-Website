import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import getDevice from './../../components/hocs/getDevice';
import getBrowser from './../../components/hocs/getBrowser';
import getOSVersion from './../../components/hocs/getOSVersion';
import GridContainer from './../../components/locs/GridContainer/GridContainer';
import { fetchContent } from './../../actions';
import homePageConfig from './assets/config/homePageConfig';

class Home extends Component {

  render() {
    this.props.fetchContent(homePageConfig);
    return <GridContainer />;
  }
}

export default {
  // take props from admins and pass them into require Auth
  component: compose(
    getDevice, getOSVersion, getBrowser,
    connect(null, {
      fetchContent
    })
  )(Home)
};
