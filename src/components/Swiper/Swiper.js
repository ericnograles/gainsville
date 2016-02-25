'use strict';

import React, {
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
import MediaActions from '../../actions/MediaActions';
import MediaStore from '../../stores/MediaStore';

var SWIPE_THRESHOLD = 160;

class Swiper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      person: MediaStore.getState().person,
      pictures: MediaStore.getState().pictures
    };

    this._animateEntrance = this._animateEntrance.bind(this);
    this._resetState = this._resetState.bind(this);
    this._swipedLeft = this._swipedLeft.bind(this);
    this._swipedRight = this._swipedRight.bind(this);
    this.onMediaStoreChange = this.onMediaStoreChange.bind(this);
  }

  _swipedLeft() {
    MediaActions.dislike(this.state.person.id);
  }
  
  _swipedRight() {
    MediaActions.like(this.state.person.id);
  }

  onMediaStoreChange(state) {
    if (!state.error) {
      this.setState({pictures: state.pictures, person: state.person});
      this._animateEntrance();
    }
  }

  componentDidMount() {
    var self = this;
    MediaStore.listen(this.onMediaStoreChange);
    MediaActions.feed();
  }

  componentWillUnmount() {
    MediaStore.unlisten(this.onMediaStoreChange);
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
          // Swipe Right
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          // Swipe left
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
    if (this.state.pan.x._value > 0) {
      // Swiped Right
      console.log('swiped right');
      this._swipedRight();
    } else if (this.state.pan.x._value < 0) {
      // Swiped Left
      console.log('swiped left');
      this._swipedLeft();

    }
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
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
          <Image style={[styles.card]} source={{uri: this.state.person.url}}></Image>
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
    paddingTop: 120,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: window.width - 80,
    height: window.width - 80
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
    backgroundColor: '#1f2429',
  },
  yupText: {
    fontSize: 16,
    color: '#fff',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
    backgroundColor: '#1f2429',
  },
  nopeText: {
    fontSize: 16,
    color: '#fff',
  }
});

export default Swiper;