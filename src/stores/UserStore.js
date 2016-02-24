import alt from '../alt';
import UserActions from '../actions/UserActions';

class UserStore {
  constructor() {
    this.state = {
      status: 'ready',
      userData: null,
      error: null
    };

    // Make sure lexical `this` is consistent. Transpiling has some funky side effects.
    this.startLogin = this.startLogin.bind(this);
    this.login = this.login.bind(this);

    this.bindListeners({
      startLogin: UserActions.startLogin,
      login: UserActions.login
    });
  }

  startLogin() {
    this.setState({status: 'logging_in'});
  }

  login(payload) {
    var toState = this.state;
    if (payload.error) {
      toState.status = 'error';
      toState.error = payload.error;
    } else {
      toState.status = 'authenticated';
      toState.userData = payload.data;
    }
  }
}

module.exports = alt.createStore(UserStore, 'UserStore');