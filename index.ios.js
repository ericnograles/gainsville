/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';

import Login from './src/components/Login/Login';
import _ from 'lodash';

class gainsville extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, nav) {
    if (route.component) {
      // pass navigator and route info
      var props = { navigator: nav, route: route };
      // expose any additional props
      if (route.props) {
        _.assign(props, route.props);
      }
      return React.createElement(route.component, props);
    }
  }

  render() {
    return (
      <Navigator
        title="Gainsville"
        style={styles.nav}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        initialRoute={{
          component: Login, title: 'Login'
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    flex: 1
  }
});

AppRegistry.registerComponent('gainsville', () => gainsville);
