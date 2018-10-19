import * as firebase from 'firebase'; 
var config = {
    apiKey: "AIzaSyCo0Xmy79aVHTkNlVDTVP-8_zI5t-EX6JE",
    authDomain: "bingo-195706.firebaseapp.com",
    databaseURL: "https://bingo-195706.firebaseio.com",
    projectId: "bingo-195706",
    storageBucket: "bingo-195706.appspot.com",
    messagingSenderId: "404894775012"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

var rootref = firebase.database();
rootref.ref('/games/gameid3').on("value", function(snapshot) {
   console.log(snapshot.val());
}, function (error) {
   console.log("Error: " + error.code);
});
export default rootref;