'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native';

var window = Dimensions.get('window');

import Swiper from '../../components/Swiper/Swiper';

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
      <View style={[styles.container]}>

        <Swiper profile={this.props.profile} navigator={this.props.navigator}></Swiper>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  }
});

export default Landing;
