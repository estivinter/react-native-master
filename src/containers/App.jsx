import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import MyGetLocation from '../components/GetLocation';
import ForecastList from '../components/ForecastList';
import ButtonRefrsh from '../components/ButtonRefrsh'

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import autoBind from 'react-autobind';

export default class App extends Component {

  constructor() {
    super();
    autoBind(this);
    this.state = {
      location: {lat:31, lng:34},
    };
  }

  componentDidMount(){
    this.getLocationAsync();
  }
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    const { latitude , longitude } = location.coords;
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + 
              latitude + '&lon=' + longitude + '&units=metric&appid=34026f1820a73bd0d6e38e6c9931d3e5';
      fetch(url)
      .then(response => response.json())
      .then(data => {
      this.setState({forecast: data, location: {lat: latitude,lng: longitude}, address:data.city.name});
    });

  };
  refresh = () => {
    window.location.reload(false);
  }
  render() {
    const {location, forecast, address} =this.state;
return (
      <View style={styles.container} >
        {location&&<View style={styles.banner}>
        <ButtonRefrsh onPress={this.refresh}/>
          <MyGetLocation address={address} location={location}/>
        </View>}
        <ScrollView>
         {forecast&&<ForecastList forecast={forecast}/>}
        </ScrollView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      marginTop:30,
      
  },
  banner: {
      fontSize: 10,
      textAlign: 'center',
      padding: 10,
      backgroundColor: '#80A4E4',
      borderColor:'#80A4E4',
  },

});

