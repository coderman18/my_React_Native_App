import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

import Loading from './components/Loading';
import React from 'react';
import Weather from './UI/Weather';

const API = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={a5f3bcb5aacd5aa55a8f43bd8eb88f14}';

export default class extends React.Component {
  state = {
    isLoading: true
  }

  getWeather = async (latitude, longitude) => {
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    this.setState({isLoading: false, temp: data.main.temp});
    console.log(data);
  }

  getLocation = async () => {

    try {
      await Location.requestForegroundAsync();
      
       // получаем данные геолокации
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      console.log(coords);
      
      // TODO: сделать запрос к API
      this.getWeather(latitude, longitude);
      
    } catch (error) {
      Alert.alert('Не могу понять, где я нахожусь:-(', 'кажется я заблудился...');
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render () {
    const {isLoading, temp} = this.state;
    return (
    
       isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center'
  }
});
