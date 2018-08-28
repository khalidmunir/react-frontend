import React, { Component } from 'react'
import moment from 'moment'

import './App.css'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import NavBar from './components/navbar/NavBar'
import Search from './components/search/Search'
import ChatItem from './components/chatitem/ChatItem'
// import chatlist from './components/chatlist';

class App extends Component {

    state = {
      chats: [],
      isLoading: true,
      errors: null
    };
  
    fetchUsers() {
      // Where are we fetching data from
      fetch(`http://localhost:8000/api/chats`)
        // We get the API response then receive data in JSON...
        .then(response => response.json())
        // Normally would use a store like redux
        // being this example demo - simpler to it do this way.. 
        .then(sorted => this.fixRelationships(sorted))
        // finally data should look good - so set the state.
        .then(data =>
          this.setState({
            chats: data,
            isLoading: false,
          })
        )
        // Catch any unknowns (errors) and update loading status
        .catch(error => this.setState({ error, isLoading: false }));
    }

  fixRelationships(inList) {

    // check if the parent id does exists- only then add to the array.
    let resortedList = null; 

    let sorted_items = inList.sort((a,b) => {
      // wasted much time figuring this - need to use minus due to behaviour of moments
      // return value giving falsy/truths. Made me wish I stuck to underscore 
      // and using the helper for sorting by date 
      return moment(b.date).format('X') -  moment(a.date).format('X') 
    });
  
    // fix and add relevant date helpers
    sorted_items.map( (item) => {
      
      item.dateenglish = moment(item.date).format('MMMM Do YYYY, h:mm:ss a')
      item.datehumanform = moment(item.date).fromNow()
      item.validParent = null;

      return item;
    })
    
    // grab all the parents - children are more tricky as only some have valid parents (they dont exist in the array).
    // (don't remove orphaned children as they will need to be re-inserted date sorted)
    let parentList = sorted_items.filter( (item) => { 
      return ((item.parent === null)||(item.parent !== null && (sorted_items.findIndex(x => x.id === item.parent) < 0)))
    })

    // grab Only the children with valid parents from the parentlist
    let childrenList = sorted_items.filter( (item) => {
      return item.parent !== null && (parentList.findIndex(x => x.id === item.parent) > 0)
    })

    // CHANGE IN LOGIC - No Longer Needthis bit
    // // grab the orphaned children - ready for final processing/merge
    // let orphanList = inList.filter( (item) => {
    //   return item.parent !== null && (parentList.findIndex(x => x.id === item.parent) < 0)
    // })

    // Algorithm - To fix List : 
    // map through the childrenList and find the parentList entry to append to..
    childrenList.map( (child, index) => {
      
      // keep it simple to show/explain logic - 
      // could have used a find and prevent the 'for' looping 
      // of the array.
      for(let i=0;i<parentList.length;i++) {        
        if( parentList[i].id == child.parent) {
          // can use later as valid reply flag
          child.validParent = true;
          parentList.splice( i+1, 0, child );
          break;
        }
      }
    })

    console.log(" ### FIXED Parent List ###", parentList)

    return parentList;
  }

  componentDidMount() {

    this.fetchUsers()

  }

  render() {
    // destructure isLoading, chats and error from the state
    const { isLoading, chats, error } = this.state;
    console.log("loaded these...", chats)
    return (
      // Fragment allows components to not poullote the html with unnessessary divs
      <React.Fragment>
        
          <div>
          <NavBar />
          <Search />
          
        <h1>User Messages</h1>
       
        
        {error ? <p>{error.message}</p> : null}
        
        {!isLoading ? (
          chats.map(chat => {
            const { id, parent, username, full_name, avatar, date, comment } = chat;
            return (
              <div key={id}>
                <ChatItem chat={ chat }/>
                
              </div>
            );
          })
        // If there is a delay in data, let's let the user know it's loading
        ) : (
          <h3>Loading chats ...</h3>
        )}
        </div>
        
      </React.Fragment>
    );
  }
  
}

export default App;
