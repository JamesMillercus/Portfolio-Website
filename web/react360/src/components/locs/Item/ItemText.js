/*eslint max-len: ["error", { "code": 800 }]*/

import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-360';

export default class ItemText extends React.Component {

  render() {
    return (
      <View>
        <Text style={styles.textHeader}> {this.props.textHeader} </Text>
        <Text style={styles.textBody}> {this.props.textBody} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 40,
    color: '#7d7d7d',
    width: 300,
    marginLeft: -10
  },
  textBody: {
    width: 480,
    color: '#7d7d7d',
    marginTop: 20,
    marginLeft: -10
  }
});
