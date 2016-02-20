'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Component,
  PanResponder,
  Image,
  Dimensions,
} from 'react-native';

import clamp from 'clamp';
import * as Firebase from 'firebase';

const wrestlers = [
  'http://3.bp.blogspot.com/_CGdbWRAh_KI/SSdB73ru-bI/AAAAAAAAA5I/8vpX7dAoTxE/s400/HacksawJimDuggan.jpg',
  'http://i3.coventrytelegraph.net/incoming/article7359444.ece/ALTERNATES/s615/curthennig.jpg',
  'https://s-media-cache-ak0.pinimg.com/236x/31/b4/78/31b478375af79310b44b4772bfd8be95.jpg',
  'http://cdn.bleacherreport.net/images_root/slides/photos/001/096/369/images-17_display_image.jpg?1310690322',
  'https://the5iveblog.files.wordpress.com/2015/04/daveyboysmith_display_image.jpg',
  'http://images2.houstonpress.com/imager/u/original/6775956/razor1.jpg',
  'http://www.revelstokemountaineer.com/wp-content/uploads/2015/11/jts.jpg',
  'https://i.ytimg.com/vi/455GalbifH8/hqdefault.jpg',
  'http://2.bp.blogspot.com/_H8hh1K-R3qo/TUHuC4TMatI/AAAAAAAAAMg/heH-xvbb1Uw/s1600/iron-sheik.JPG',
  'http://images.complex.com/complex/image/upload/c_limit,fl_progressive,q_80,w_680/tzdz3irrzczhlcm69xvl.jpg'
];

var SWIPE_THRESHOLD = 160;

class Flix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      person: wrestlers[0],
    };

    this._goToNextPerson = this._goToNextPerson.bind(this);
    this._animateEntrance = this._animateEntrance.bind(this);
    this._resetState = this._resetState.bind(this);
  }

  _goToNextPerson() {
    let currentPersonIdx = wrestlers.indexOf(this.state.person);
    let newIdx = currentPersonIdx + 1;

    this.setState({
      person: wrestlers[newIdx > wrestlers.length - 1 ? 0 : newIdx]
    });
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState)
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextPerson();
    this._animateEntrance();
  }

  render() {
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.card, animatedCardStyles]} source={{uri: this.state.person}} {...this._panResponder.panHandlers}>
          <Image style={[styles.card]} source={{uri: this.state.person}}></Image>
        </Animated.View>

        <Animated.View style={[styles.nope, animatedNopeStyles]}>
          <Text style={styles.nopeText}>Do you even lift, bruh?</Text>
        </Animated.View>

        <Animated.View style={[styles.yup, animatedYupStyles]}>
          <Text style={styles.yupText}>Nice gains, bruh!</Text>
        </Animated.View>
      </View>
    );
  }
}

var window = Dimensions.get('window');
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  card: {
    width: window.width,
    height: window.width
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  }
});

AppRegistry.registerComponent('gainsville', () => Flix);
