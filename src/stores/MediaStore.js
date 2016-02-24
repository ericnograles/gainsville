import alt from '../alt';
import MediaActions from '../actions/MediaActions';

class MediaStore {
  constructor() {
    this.state = {
      error: null,
      person: {},
      pictures: []
    };

    this.bindListeners({
      like: MediaActions.like,
      dislike: MediaActions.dislike,
      feed: MediaActions.feed
    });
  }

  nextPerson() {
    var currentPersonIdx = this.state.pictures.indexOf(this.state.person);
    var newIdx = currentPersonIdx + 1;
    return this.state.pictures[newIdx > this.state.pictures.length - 1 ? 0 : newIdx];
  }

  feed(payload) {
    this.setState({error: payload.error, pictures: payload.data, person: payload.data[0]});
  }

  like(payload) {
    if (payload.error) {
      this.setState({error: payload.error})
    } else {
      this.setState({error: null, person: this.nextPerson()})
    }
  }

  dislike(payload) {
    if (payload.error) {
      this.setState({error: payload.error})
    } else {
      this.setState({error: null, person: this.nextPerson()})
    }
  }
}

module.exports = alt.createStore(MediaStore, 'MediaStore');