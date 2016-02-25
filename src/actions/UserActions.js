import alt from '../alt';
import FirebaseService from '../services/FirebaseService';

class UserActions {
  constructor() {
    this.firebaseService = new FirebaseService();

    this.startLogin = this.startLogin.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  startLogin() {
    return true;
  }

  logout() {
    return true;
  }

  login(email, password) {
    var self = this;
    return dispatch => {
      self.firebaseService
        .login(email, password)
        .then((userData) => {
          dispatch({data: userData})
        })
        .catch((err) => {
          dispatch({error: err})
        });
    }
  }
}

module.exports = alt.createActions(UserActions);