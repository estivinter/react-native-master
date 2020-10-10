import React, {Component} from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ForecastCard from '../ForecastCard';

export default class ForecastList extends Component {
componentDidMount(){
  this.HoursListToDailyList();
}
  HoursListToDailyList(){
    var dataForContent1={
      sunset:this.props.forecast.city.sunset,
      sunrise:this.props.forecast.city.sunrise,
      description: this.props.forecast.list[0].weather.description,
      wind: this.props.forecast.list[0].wind,
    }
    var date = this.props.forecast.list[0].dt_txt;
    var res = date.substr(8, 2);
    var currentList=[];
    var result=[];
    this.props.forecast.list.map((item)=>{
      if(res===item.dt_txt.substr(8,2)){
        currentList.push(item);
      } else{
        res=item.dt_txt.substr(8,2);
        result.push(currentList);
        currentList=[];
      }
    });
    this.setState({list: result, dataForContent: dataForContent1});
  }
  
render() {
  return (
    <View>
      {this.state&&<FlatList data={this.state.list} 
                      style={{marginTop:20}} 
                      key={item => item.dt_text} 
                      renderItem={({item}) => <ForecastCard detail={item} content={ this.state.dataForContent} location={this.props.forecast.city.name} description={this.props.weather}/>} />}
    </View>
  );
}
}

const styles = StyleSheet.create({
  card:{
    height: 200,
    backgroundColor:'rgba(56, 172, 236, 1)',
    borderWidth:0,
    borderRadius:20
}
});
