import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, AppRegistry } from 'react-360';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './../reducers';
import Router from './../routes/Routes';

export default class App extends Component {

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store} style={styles.appContainer}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    width: 4700,
    height: 1000,
    // backgroundColor: '#000'
  }
});

AppRegistry.registerComponent('App', () => App);
