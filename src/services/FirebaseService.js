import Firebase from 'firebase';

export default class FirebaseService {

  constructor() {
    this.login = this.login.bind(this);
    this.getCurrentValue = this.getCurrentValue.bind(this);
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
    this.feed = this.feed.bind(this);
  }

  getCurrentValue(ref) {
    return new Promise(
      (resolve, reject) => {
        ref.on('value', function(snapshot) {
          ref.off('value'); // No longer need updates once we have a value
          return resolve(snapshot.val());
        });
      }
    );
  }

  feed() {
    return new Promise(
      (resolve, reject) => {
        var picturesRef = new Firebase('https://gainsville.firebaseio.com/pictures');
        picturesRef.orderByChild('created_at')
          .limitToLast(100)
          .on('value', function(snapshot) {
            var pictureList = snapshot.val();
            var pictures = [];
            Object.keys(pictureList).forEach(function(id) {
              pictureList[id].id = id;
              pictures.push(pictureList[id]);
            });
            picturesRef.off('value');
            return resolve({pictures: pictures})
          });
      }
    );
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      var ref = new Firebase('https://gainsville.firebaseio.com');
      ref.authWithPassword({
        email: email,
        password: password
      }, function(err, userData) {
        if (err) {
          if (err.code === 'INVALID_USER') {
            ref.createUser({
              email: self.state.email,
              password: self.state.password
            }, function(error, userData) {
              if (error) {
                return reject(error.message);
              } else {
                return resolve(userData);
              }
            });
          } else {
            return reject(err);
          }
        } else {
          return resolve(userData);
        }
      });
    });
  }

  like(id) {
    return new Promise(
      (resolve, reject) => {
        var pictureRef = new Firebase('https://gainsville.firebaseio.com/pictures/' + id);
        this.getCurrentValue(pictureRef)
          .then((value) => {
            var nice_gains_bruh = value.nice_gains_bruh || 0;
            nice_gains_bruh += 1;
            pictureRef.update({
              nice_gains_bruh: nice_gains_bruh
            });
            return resolve(true);
          })
          .catch((err) => {
            return reject(err);
          })
      }
    );
  }

  dislike(id) {
    return new Promise(
      (resolve, reject) => {
        var pictureRef = new Firebase('https://gainsville.firebaseio.com/pictures/' + id);
        this.getCurrentValue(pictureRef)
          .then((value) => {
            var bruh_do_you_lift = value.bruh_do_you_lift || 0;
            bruh_do_you_lift += 1;
            pictureRef.update({
              bruh_do_you_lift: bruh_do_you_lift
            });
            return resolve(true);
          })
          .catch((err) => {
            return reject(err);
          })
      }
    );
  }
}