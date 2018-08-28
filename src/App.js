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
        .then(sorted => this.sortByDate(sorted))
        .then(sorted => this.fixRelationships(sorted))
        // finally data looks good - so set the state.
        .then(data =>
          this.setState({
            chats: data,
            isLoading: false,
          })
        )
        // Catch any unknowns (errors) and update loading status
        .catch(error => this.setState({ error, isLoading: false }));
    }

    sortByDate(items) {
      //console.log("BEFORE::SOrtBYDate Items", items) 
      
      // use moments.js to sort the list by date
      let sorted_items = items.sort((a,b) => {
        //console.log("sorting", moment(a.date).valueOf)
        
          return moment(b.date).format('X') -  moment(a.date).format('X') 
      });
    
      //console.log("AFTER::SOrtBYDate Items",sorted_items) 
      
      // sorted_items are sorted by date
      items = sorted_items;

      // fix and add relevant date helpers
      items.map( (item) => {
      
        item.dateenglish = moment(item.date).format('MMMM Do YYYY, h:mm:ss a')
        item.datehumanform = moment(item.date).fromNow()

        return item;
      })

      return items;
    }

  fixRelationships(inList) {

    // Walk the List 
    // and check if the parent id does exists- only then 
    // reshuffle the array.
    let resortedList = null; 

    
    
    // grab all the parents - children are more tricky as only some have valid parents (they dont exist in the array).
    // (don't remove orphaned children as they will need to be re-inserted date sorted)
    let parentList = inList.filter( (item) => { 
      return ((item.parent === null)||(item.parent !== null && (inList.findIndex(x => x.id === item.parent) < 0)))
    })

    // grab Only the children with valid parents from the parentlist
    let childrenList = inList.filter( (item) => {
      return item.parent !== null && (parentList.findIndex(x => x.id === item.parent) > 0)
    })

    // grab the orphaned children - ready for final processing/merge
    let orphanList = inList.filter( (item) => {
      return item.parent !== null && (parentList.findIndex(x => x.id === item.parent) < 0)
    })

    // Algorithm - To fix List : 
    // append orphaned entries into parent list (since not vaild children, i.e. almost real parents)
    // then sort by date and append the real children into the correct slots

    // using destrucuring
    resortedList = parentList; // = [ ...parentList ]

    //this.sortByDate(parentList)
    // let sorted_items = parentList.sort((a,b) => {
    //   // console.log( "SORTING....", moment(a.date).valueOf(), moment(b.date).valueOf() )
    //   return moment(a.date).valueOf() >  moment(b.date).valueOf() 
    // });

    // // fix and add relevant date helpers
    // sorted_items = sorted_items.map( (item) => {

    //   item.dateenglish = moment(item.date).format('MMMM Do YYYY, h:mm:ss a')
    //   item.datehumanform = moment(item.date).fromNow()

    //   return item;
    // })

    console.log("resortedList Items", resortedList)

    // date sort the children and append in reverse for loop so mutiple resonses for a single parent remains intact.

    console.log( "childernList ", childrenList )
    console.log( "parentList ", parentList )
    console.log( "orphanList ", orphanList )


    let NewresortedList = inList.map((item, index, parentList) => {

      console.log(moment(item.date).valueOf())
      if(item.parent) {
        console.log("I got a parent", item.id, item.parent)
        inList.map((it) => {
          if(it.id == item.parent) {


            let localItem = item;
            


            // find local item position in array and remove it
            // find the parent id in the array (as item.id) and push this child item after it
            // finally the array is sorted by date and replies


            // confirmed the parent and child exists. 

            // thinking about the logic here... do I need to manupulate the array or 
            // should I allow react to fix this at display time ?? 
            // thinking......//? 


            console.log("THIS IS ME (PARENT) ", it)
            console.log("AND MY CHILD EXISTS", item)
          } else {
            //console.log("SORRY NO PARENT EXISTS", it)
          }
        })
        
      }
      else {
        console.log("I got NO parent", item.id, item.parent)
      }


      return item;
      
    })

    

    // resortedList.forEach(function(obj) {
    //   if(obj.parent){
    //     var parentid=obj.parent;
    //     if(parentid){
    //       var par= resortedList.filter(x => x.id === parentid);
    //       if(par.length){
    //         //match
    //         console.log("Parent" , par);
    //         console.log("Child" , obj)
    //       }
    //     }
    //   }
    // });

    console.log("Results:resorted reslationship", resortedList)
    return resortedList;
    // then reorder the list so the parent id's anr applied. 
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
