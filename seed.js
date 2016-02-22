var Firebase = require('firebase');
const wrestlers = [
  {url: 'http://3.bp.blogspot.com/_CGdbWRAh_KI/SSdB73ru-bI/AAAAAAAAA5I/8vpX7dAoTxE/s400/HacksawJimDuggan.jpg', user_name: 'Jim'},
  {url: 'http://i3.coventrytelegraph.net/incoming/article7359444.ece/ALTERNATES/s615/curthennig.jpg', user_name: 'Curt'},
  {url: 'https://s-media-cache-ak0.pinimg.com/236x/31/b4/78/31b478375af79310b44b4772bfd8be95.jpg', user_name: 'Ric'},
  {url: 'http://cdn.bleacherreport.net/images_root/slides/photos/001/096/369/images-17_display_image.jpg?1310690322', user_name: 'Randy'},
  {url: 'https://the5iveblog.files.wordpress.com/2015/04/daveyboysmith_display_image.jpg', user_name: 'Davey'},
  {url: 'http://images2.houstonpress.com/imager/u/original/6775956/razor1.jpg', user_name: 'Razor'},
  {url: 'http://www.revelstokemountaineer.com/wp-content/uploads/2015/11/jts.jpg', user_name: 'Jake'},
  {url: 'https://i.ytimg.com/vi/455GalbifH8/hqdefault.jpg', user_name: 'Warrior'},
  {url: 'http://2.bp.blogspot.com/_H8hh1K-R3qo/TUHuC4TMatI/AAAAAAAAAMg/heH-xvbb1Uw/s1600/iron-sheik.JPG', user_name: 'Sheik'},
  {url: 'http://images.complex.com/complex/image/upload/c_limit,fl_progressive,q_80,w_680/tzdz3irrzczhlcm69xvl.jpg', user_name: 'Honky'}
];
var uuid = require('uuid');
var picturesRef = new Firebase('https://gainsville.firebaseio.com/pictures');

wrestlers.forEach(function(wrestler) {
  wrestler.created_at = new Date().getTime();
  picturesRef
    .child(uuid.v4())
    .set(wrestler);
});


//picturesRef.orderByChild('created_at')
//  .limitToLast(100)
//  .on('value', function(snapshot) {
//    var pictureList = snapshot.val();
//
//    //console.log(pictureList);
//    Object.keys(pictureList).forEach(function(id) {
//      if (pictureList[id].yup['Eric']) {
//        console.log(pictureList[id]);
//      }
//    });
//  });

