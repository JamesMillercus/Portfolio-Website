import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import { StyleSheet, AppRegistry } from 'react-360';
import { store } from './../Store.js';
import Router from './../routes/Routes';

export default class App extends Component {
  componentWillMount() {
    this.userAgent = navigator.userAgent;
  }

  render() {
    return (
      <UserAgentProvider ua={this.userAgent} store={store} style={styles.appContainer}>
        <Provider store={store} style={styles.appContainer}>
          <Router />
        </Provider>
      </UserAgentProvider>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    width: 4069,
    height: 720,
    // backgroundColor: 'red'
  }
});

AppRegistry.registerComponent('App', () => App);
