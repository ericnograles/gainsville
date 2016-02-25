'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

var window = Dimensions.get('window');

import Swiper from '../../components/Swiper/Swiper';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import GainsvilleCamera from '../GainsvilleCamera/GainsvilleCamera';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this._showYourGains = this._showYourGains.bind(this);
  }

  _showYourGains() {
    this.props.navigator.push({
      component: GainsvilleCamera,
      props: {profile: this.props.profile}
    });
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
        <NavigationBar hasLogoutButton={true} navigator={this.props.navigator}></NavigationBar>
        <Swiper profile={this.props.profile} navigator={this.props.navigator}></Swiper>
        <TouchableHighlight onPress={this._showYourGains} style={[styles.cameraButton]}>
          <Text style={[styles.cameraButtonText]}>Show Your Gains</Text>
        </TouchableHighlight>
      </Image>
    );
  }
}

var styles = StyleSheet.create({
  background: {
    flex: 1,
    height: window.height,
    width: window.width,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingTop: 40
  },
  cameraButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
    width: window.width,
    alignItems: 'center',
    backgroundColor: '#a60707',
    padding: 20
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 16
  }
});

export default Landing;