import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
//import SelectedField from '@material-ui/core/SelectedField'

 class Search extends Component {
     state = {
         searchText: '',
         results: null,
     }
render() {
    return (
      <div>
        <TextField
            name="search text"
            value={this.state.searchText}
            onChange={this.onTextChange}
            floatinglabeltext="search the messages"
        />
      </div>
    )
  }
}
export default Search;