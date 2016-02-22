'use strict';
import React, { Component, Navigator, StyleSheet } from 'react-native';
import StartScreen from '../StartScreen/StartScreen';
import _ from 'lodash';

class Main extends Component {
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
        style={[styles.nav]}
        title="Gainsville"
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        initialRoute={{
        component: StartScreen, title: 'Welcome to Gainsville'
        }}>
      </Navigator>
    )
  }
}

var styles = StyleSheet.create({
  nav: {
    flex: 1
  }
});

export default Main;