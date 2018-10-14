import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  VrButton,
  Environment
} from 'react-360';
import { Dimensions, ImageBackground } from "react-native";

export default class Hero extends React.Component {
  componentDidMount(){
    Environment.setBackgroundImage(asset('360_world.jpg'), {
      format: '2D',
    });
  }

  state = {
    leftIconHover: false,
    rightIconHover: false
  };

  render() {
    return (
          <View style={styles.heroContainer}>
            <View style ={[styles.leftIcon, this.state.leftIconHover ? styles.leftIconHover : null]}>
              <ImageBackground source={asset('mail-scrolled.png')} style={styles.leftIconImage} />
            </View>
            <VrButton
              onEnter={() => this.setState({leftIconHover: true})} onExit={ () => this.setState({leftIconHover: false})}
              style={styles.leftIconHitBox}
            />
            <View style ={[styles.rightIcon, this.state.rightIconHover ? styles.rightIconHover : null]}>
              <ImageBackground source={asset('tech-scrolled.png')} style={styles.rightIconImage} />
            </View>
            <VrButton
              onEnter={() => this.setState({rightIconHover: true})} onExit={ () => this.setState({rightIconHover: false})}
              style ={styles.rightIconHitBox}
            />
            <View style={styles.heroIconShadow} />
            <View style={styles.heroIcon} />
            <Image source={asset('design.png')} style={styles.heroImage} />
            <Text style={styles.heroText}>
              Creative Technology projects I have worked on
            </Text>
          </View>
    );
  }
};

const styles = StyleSheet.create({
  heroContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#639dda',
  },
  heroIcon: {
    marginTop: 20,
    marginLeft: '36%',
    borderRadius: 200/2,
    width:160,
    height:160,
    backgroundColor: '#008f9c'
  },
  heroIconShadow: {
    marginTop: 22,
    marginLeft: 217,
    borderRadius: 200/2,
    width:160,
    height:160,
    backgroundColor: '#000',
    position:'absolute'
  },
  heroImage: {
    width:100,
    height:100,
    marginTop: 50,
    marginLeft: 240,
    position:'absolute'
  },
  heroText: {
    marginTop: 20,
    fontSize: 30,
    color: '#008f9c',
    fontWeight: 'bold'
  },
  leftIcon: {
    width: 100,
    height: 100,
    backgroundColor: '#7d7d7d',
    position: 'absolute',
    marginTop: 60,
    marginLeft: 23,
    borderRadius: 100/2
  },
  leftIconHover: {
    width: 100,
    height: 100,
    backgroundColor: '#269a18',
    position: 'absolute',
    marginTop: 60,
    borderRadius: 100/2
  },
  leftIconHitBox: {
    width: 150,
    height: 150,
    // backgroundColor: '#ff0006',
    marginTop: '4.5%',
    position:'absolute',
    borderRadius: 150/2
  },
  leftIconImage:{
    width: 50,
    height: 33,
    marginTop: 33,
    marginLeft: '25%'
  },
  rightIcon: {
    width: 100,
    height: 100,
    backgroundColor: '#7d7d7d',
    position: 'absolute',
    marginTop: 60,
    marginLeft: 455,
    borderRadius: 100/2,
  },
  rightIconHover: {
    width: 100,
    height: 100,
    backgroundColor: '#e3bb2a',
    position: 'absolute',
    marginTop: 60,
    marginLeft: 455,
    borderRadius: 100/2
  },
  rightIconImage:{
    width: 50,
    height: 33,
    marginTop: 33,
    marginLeft: '26%'
  },
  rightIconHitBox: {
    width: 150,
    height: 150,
    // backgroundColor: '#ff0006',
    marginTop: '5.8%',
    position:'absolute',
    borderRadius: 150/2,
    marginLeft: 429
  },
});
