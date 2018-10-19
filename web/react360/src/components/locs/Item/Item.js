/*eslint max-len: ["error", { "code": 5000 }]*/
import React from 'react';
import { StyleSheet, View, Text } from 'react-360';
import { connect } from 'react-redux';
import { fetchHeroText } from './../../../actions';
import ItemImage from './ItemImage';

class Item extends React.Component {

  render() {
    // const mouseOver = () => this.props.fetchHeroText('scrolled');
    // const mouseOut = () => this.props.fetchHeroText('');
    // <View style={styles.hero} onEnter={() => mouseOver()} onExit={() => mouseOut()} >
    return (
      <View style={styles.item} >
        <ItemImage />
        <Text> Text </Text>
      </View>
    );
  }
}

// const mapStateToProps = ({ r360, heroText, heroHover }) => ({ r360, heroHover, heroText });

// export default connect(mapStateToProps, { fetchHeroText })(Hero);

export default connect(null, null)(Item);

const styles = StyleSheet.create({
  item: {
    width: 600,
    height: 300,
    marginLeft: 1000,
    marginTop: 300,
    position: 'absolute',
    borderColor: '#fff',
    backgroundColor: '#fff',
    // outline: 'none'
    // backgroundColor: '#639dda'
  }
});
