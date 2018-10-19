
import AddNotes from '../components/AddNotes.js';
import {connect} from 'react-redux';

import { addNote } from '../actions/index.js';

// const mapStateToProps =(state) =>{
//   return {
//     notes:state.homeReducer.notes,
//     status:state.homeReducer.status
//   }
// }

const mapDispatchToProps= (dispatch) => {
  return {
    addNote: (notes) => { dispatch(addNote(notes)) }
  }
}

export default connect(null,mapDispatchToProps)(AddNotes);
