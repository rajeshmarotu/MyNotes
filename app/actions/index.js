
import * as actionTypes from './actionTypes.js';

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

var rootRef = firebase.database();
var gameRef = rootRef.ref('/data/games/');
var userRef = rootRef.ref('/data/users/');
//import rootref from './firebase.js';

export const parseNotes = () => {

  // gameRef.child(gameId+'/players').on('value',async (snapshot) => {
  //     var playersDetails=[]
  //     for(var key in snapshot.val()){

  //         var snap = await userRef.child(key).once('value');
  //         var player={}
  //         player['id']=key;
  //         player['name']=snap.val().name;
  //         player['status']=snapshot.val()[key]['status'];
  //         playersDetails.push(player)
  //     }

        console.log('parseNotes')
        return {
       type:actionTypes.PARSE_NOTES,
       payload: [ 
                      {
                      'noteId':1234,
                      'title':'Title',
                      'content':'This is some content',
                      'timestamp':15678778759,
                      'status':true
                      },
                      {
                        'noteId':23345,
                        'title':'Title2',
                        'content':'This is some content2',
                        'timestamp':15678778780,
                        'status':true
                      }
                 ]
     };

}

export function addNote(note){
  return (dispatch) => {
      console.log('addNote')
      var noteId=Math.floor(Math.random() * 2000) + 1000;
      var date=new Date().getTime();
      dispatch(
        {
          type:actionTypes.ADD_NOTE,
          payload:{
            note:{
              'noteId':noteId,
              'title':'',
              'content':note,
              'timestamp':date,
              'status':true,

            }
          }
        }
      )

  }

}

export function deleteNote(noteId){
  console.log('deleteNote')
  console.log(noteId)
  return (dispatch) => {
    dispatch({
    type:actionTypes.DELETE_NOTE,
    payload:{
      noteId:noteId
    }
    })
  }
}

export function multiDelete(noteids){
  return (dispatch) => {
    dispatch({
    type:actionTypes.MULTI_DELETE,
    payload:{
      noteids:noteids
    }
    })
  }
}

export function updateNote(content,noteId){
    console.log(noteId)
    return (dispatch) => {
      dispatch({
          type:actionTypes.UPDATE_NOTE,
          payload:{
            content,
            noteId
          }
        })
    }
}


// export function joinGame(gameId){
// 	return (dispatch) => {
//     var date=new Date().getTime();
// 		gameRef.child(gameId+'/players').update({34567:{'joindeat':date,'status':false}});

// 		dispatch({
// 		      type:actionTypes.JOIN_GAME,
//       		  payload: gameId
// 		    });
// 	}
// }

// export function exitGame(gameId){


// 		gameRef.child(gameId+'/players').update({34567:false});
// 		console.log('Exited from game ! ')

// }

// export function readyToPlay(gameId){
//   // return (dispatch) => {
//     gameRef.child(gameId+'/players/'+34567).update({'status':true});
//     dispatch({
//       type:actionTypes.UPDATE_PLAYER_STATUS,
//       payload:{
//         'playerId':34567,
//         'status':true
//       }
//     });
//     // dispatch({
//     //   type:actionTypes.UPDATE_USER_STATUS,
//     //   payload:{
//     //     'status':true
//     //   }
//     // });
//   // }
// }
// export function notReady(gameId){
//   gameRef.child(gameId+'/players/'+34567).update({'status':true});
//   dispatch({
//     type:actionTypes.UPDATE_PLAYER_STATUS,
//     payload:{
//       'playerId':34567,
//       'status':false
//     }
//   });
//   //
//   // dispatch({
//   //   type:actionTypes.UPDATE_USER_STATUS,
//   //   payload:{
//   //     'status':false
//   //   }
//   // });

// }
// export function parsePlayers(gameId){
//   return (dispatch) => {
// 		gameRef.child(gameId+'/players').on('value',async (snapshot) => {
//       var playersDetails=[]
//       for(var key in snapshot.val()){

//           var snap = await userRef.child(key).once('value');
//           var player={}
//           player['id']=key;
//           player['name']=snap.val().name;
//           player['status']=snapshot.val()[key]['status'];
//           playersDetails.push(player)
//       }

//       dispatch({
// 	      type:actionTypes.PARSE_PLAYERS,
//     		payload: playersDetails
//   		});
//     })
// 	}
// }
// export const updateRooms = () => {
// 	return async (dispatch) => {

// 		console.log('updating')
// 		var gameData = await gameRef.once('value');
// 		//var keys = Object.keys(gameData.val())
//     var rooms=[];
//     for(var key in gameData.val()){
//       rooms.push({'name':gameData.val()[key]['gamename'],'id':key})
//     }

// 		dispatch({
// 		      type:actionTypes.UPDATE_ROOMS,
// 		      payload:rooms
// 		    });
// 	}
// }
