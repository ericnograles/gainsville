'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image
} from 'react-native';

var window = Dimensions.get('window');

import Swiper from '../../components/Swiper/Swiper';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <Image style={[styles.background]} source={require('../../assets/images/background.png')} resizeMode="cover">
        <NavigationBar hasBackButton={true}></NavigationBar>
        <Swiper profile={this.props.profile} navigator={this.props.navigator}></Swiper>
      </Image>
    );
  }
}

var styles = StyleSheet.create({
  background: {
    flex: 1,
    height: window.height,
    width: window.width
  },
  container: {
    flex: 1,
    paddingTop: 40
  }
});

export default Landing;
