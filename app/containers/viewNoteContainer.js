
import ViewNote from '../components/ViewNote.js';
import {connect} from 'react-redux';

import { updateNote, deleteNote } from '../actions/index.js';

// const mapStateToProps =(state) =>{
//   return {
//     notes:state.homeReducer.notes,
//     status:state.homeReducer.status
//   }
// }

const mapDispatchToProps= (dispatch) => {
  return {
    deleteNote: (noteId) => { dispatch(deleteNote(noteId)) },
    updateNote: (notes,noteId) => { dispatch(updateNote(notes,noteId))}
  }
}

export default connect(null,mapDispatchToProps)(ViewNote);
