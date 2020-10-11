import React, {Component} from 'react';
import { StyleSheet, View, Image, FlatList ,Dimensions } from 'react-native';
import { Text,Divider } from 'react-native-elements';
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
export default class ForecastCard extends Component {
  _renderHeader(){
    const windowWidth = Dimensions.get('window').width;
    var date = new Date(this.props.detail[0].dt*1000);
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayOfWeek = days[date.getDay()]


    return(
      <View>
          <View style={{flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
    <Text style={styles.header}>{dayOfWeek}   {this.props.detail[0].dt_txt.substr(0,10)} </Text>
    <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:10}} />
      <FlatList
        style={{width: windowWidth*0.9}}
      horizontal
      pagingEnabled={true}
      key={item => item.dt_text} 
      showsHorizontalScrollIndicator={true}
      data={this.props.detail}
      renderItem={this._renderWeatherList}
      />
          </View>
      </View>
    )
  }
  _renderWeatherList(item){
    let time;
    var date = new Date(item.item.dt*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    time = hours + ':' + minutes.substr(-2);
    return(
      <View>
          <Text style={styles.time}>{time}</Text>
          <Image style={{width:60, height:60}} source={{uri:"https://openweathermap.org/img/w/" + item.item.weather[0].icon + ".png"}} />
          <Text style={styles.time}>{Math.round( item.item.main.temp * 10) / 10 }&#8451;</Text>
      </View>
    )
  }
  _renderContent(){
    const {content}=this.props;
    var description =this.props.detail[0].weather[0].description
    var date = new Date(content.sunrise*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    let sunrise = hours + ':' + minutes.substr(-2);
    var date = new Date(content.sunset*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    let sunset = hours + ':' + minutes.substr(-2);
    return (
    <View>
      <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:10}} />
          <Text style={styles.notes}>Sunrise: {sunrise}</Text>
          <Text style={styles.notes}>Sunset: {sunset}</Text>
          <Text style={styles.notes}>Description: {description}</Text>
          <Text style={styles.notes}>wind speed: {content.wind.spead} {content.wind.deg}</Text>
    </View>);
  }
  render(){
    return (
      <View style={styles.card}>
        <Collapse>
    <CollapseHeader>
      {this._renderHeader()}
    </CollapseHeader>
    <CollapseBody>
      {this._renderContent()}
    </CollapseBody>
</Collapse>
      </View>
  );
  }
}

const styles = StyleSheet.create({
  card:{
    backgroundColor:'rgba(56, 172, 236, 1)',
    borderWidth:0,
    borderRadius:20,
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 5,
},
time:{
  fontSize:15
},
notes: {
  paddingHorizontal: 5,
  fontSize: 15,
},
header: {
  paddingHorizontal: 5,
  fontSize: 16,
  paddingVertical: 3,
  fontWeight: '500'
},
scrollSnapType:{
  width:95
}
});
