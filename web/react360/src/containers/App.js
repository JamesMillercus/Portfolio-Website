import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppRegistry } from 'react-360';
import ReduxThunk from 'redux-thunk';
import reducers from './../reducers';
import Router from './../routes/Routes';
// import react360 from './../client';

class App extends Component {

  render() {
    // console.log(R360);
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
AppRegistry.registerComponent('App', () => App);
