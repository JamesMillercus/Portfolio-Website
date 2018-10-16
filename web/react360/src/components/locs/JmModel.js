import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  asset
} from 'react-360';
import Entity from 'Entity';
const AmbientLight = require('AmbientLight');

export default class jmModel extends React.Component {

  render() {
    return (
      <View>
        <AmbientLight />
        <Entity
          source={{gltf2: asset('scene.gltf')}}
          style={{transform: [
            {rotateY: -10},
            {rotateX: -10},
            {rotateZ: -10}
          ]}}
        />
      </View>
    );
  }
};
