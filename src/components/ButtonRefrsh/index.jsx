import React, {Component} from 'react';
import { FlatList, StyleSheet, View, button, Text } from 'react-native';
import ForecastCard from '../ForecastCard';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ForecastList extends Component {
    
    constructor(props){
        super(props);
      }
      refreshFunction = () => {
        this.props.onPress?.();
      }

    
render() {
    const iconButtn = <Icon.Button name="refresh" onClick={this.refreshFunction} style={{backgroundColor:"#80a4e4",fontSize:"5", alignItems:"center"  }}></Icon.Button>

    return (
    <View style={styles.button} >
        {iconButtn}
    </View>
  );
}
}

const styles = StyleSheet.create({
  button:{
    width: 60, 
    height:50,
    alignItems:"center"
}
});
