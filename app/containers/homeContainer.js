
import Home from '../components/home.js';
import {connect} from 'react-redux';

import { parseNotes, multiDelete } from '../actions/index.js';

const mapStateToProps =(state) =>{
  return {
    notes:state.homeReducer.notes,
    status:state.homeReducer.status
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    parseNotes: () => dispatch(parseNotes()),
    multiDelete: (notes) => dispatch(multiDelete(notes))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
