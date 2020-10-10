import MyApp from './src/containers/App';
import { registerRootComponent } from 'expo';

import React from 'react';

export default class App extends React.Component {
  render() {
    return <MyApp/>;
  }
}
registerRootComponent(App);