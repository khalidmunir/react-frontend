import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import NavBar from './components/navbar/NavBar';
import Search from './components/search/Search';


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
        // ...then we update the users chats to the state
        .then(data =>
          this.setState({
            chats: data,
            isLoading: false,
          })
        )
        // Catch any unknowns (errors) and update loading status
        .catch(error => this.setState({ error, isLoading: false }));
    }

  componentDidMount() {

    this.fetchUsers()

  }

  render() {
    // destructure isLoading, chats and error from the state
    const { isLoading, chats, error } = this.state;
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
                <img src={avatar} alt={username}></img>
                <p>id: {id} </p>
                <p>parent id: {parent} </p>    
                <p>Name: {full_name}</p>
                <p>Comments: {comment}</p>
                <p>{date}</p>
                <hr />
              </div>
            );
          })
        // If there is a delay in data, let's let the user know it's loading
        ) : (
          <h3>Loading...</h3>
        )}
        </div>
        
      </React.Fragment>
    );
  }
  
}

export default App;
