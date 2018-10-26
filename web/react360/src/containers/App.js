import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, AppRegistry } from 'react-360';
import { store } from './../store.js';
import Router from './../routes/Routes';

export default class App extends Component {

  render() {
    return (
      <Provider store={store} style={styles.appContainer}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    width: 4000,
    height: 1000,
    // backgroundColor: 'red'
  }
});

AppRegistry.registerComponent('App', () => App);
