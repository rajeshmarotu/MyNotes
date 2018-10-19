import * as actionTypes from '../actions/actionTypes.js';
const default_state={
  notes:[],
  status:false
}
export default function homeReducer(state=default_state,action){

  switch(action.type){
    case actionTypes.PARSE_NOTES:
      return {...state,notes:action.payload,status:true}
      
    case actionTypes.ADD_NOTE:
      console.log('add note');
      //return { ...state, user:{ ...state.user, status: action.payload.status }}
      return { ...state, notes:[...state.notes,action.payload.note]}


    case actionTypes.DELETE_NOTE:
      console.log('del note')
      console.log(state.notes.filter((note) => {
        return note.noteId != action.payload.noteId
      }))
      var notes=state.notes.filter((note) => {
        return note.noteId != action.payload.noteId
      });
      return {...state, notes}


    case actionTypes.MULTI_DELETE:
      console.log('multi delete')
      var noteids=action.payload.noteids.slice(0);
      console.log(noteids)
      var notes=state.notes.filter((note,i) => {
        console.log(noteids.indexOf(note.noteId))
        return noteids.indexOf(note.noteId)==-1;
      })
      console.log(notes)
      return { ...state, 
            notes:
              state.notes.filter((note,i) => {
                return noteids.indexOf(note.noteId)==-1;
                }
              )
            };


    case actionTypes.UPDATE_NOTE:
      console.log('update note')
      var noteId = action.payload.noteId;
      var noteContent = action.payload.content;
      console.log(noteId)
      console.log(noteContent)
      var date=new Date().getTime();
      state.notes.map((note,i) => {
          if(note.noteId == noteId ) {
            note.content=noteContent
            note.timestamp=date
          }
        })
      var notes=state.notes;
      return {...state, notes:notes}

    default:
      return state;
  }
}
