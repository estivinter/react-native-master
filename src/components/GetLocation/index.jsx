import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
} from 'react-native';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

export default class MyGetLocation extends Component {
    render() {
        const { location,address } = this.props;
        return (
            <View style={styles.container}>
                {location&&<Text style={styles.text}>{address}</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding:20,
      marginTop:10,
      borderRadius:10
  },
  text: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: 'white',
      fontWeight: '500',
  },
});
