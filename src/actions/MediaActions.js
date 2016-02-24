import alt from '../alt';
import FirebaseService from '../services/FirebaseService';

class MediaActions {
  constructor() {
    this.firebaseService = new FirebaseService();

    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
  }

  feed() {
    var self = this;
    return dispatch => {
      self.firebaseService
        .feed()
        .then((response) => {
          dispatch({data: response.pictures})
        })
        .catch((err) => {
          dispatch({error: err});
        });
    }
  }

  like(id) {
    var self = this;
    return dispatch => {
      self.firebaseService
        .like(id)
        .then((response) => {
          dispatch({data: response});
        })
        .catch((err) => {
          dispatch({error: err});
        });
    }
  }

  dislike(id) {
    var self = this;
    return dispatch => {
      self.firebaseService
        .dislike(id)
        .then((response) => {
          dispatch({data: response});
        })
        .catch((err) => {
          dispatch({error: err});
        });
    }
  }
}

module.exports = alt.createActions(MediaActions);