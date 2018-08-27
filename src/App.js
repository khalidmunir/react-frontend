import React, { Component } from 'react';
import './App.css';

class App extends Component {

    state = {
      chats: [],
      isLoading: true,
      errors: null
    };
  
    
  

    fetchUsers() {
      // Where we're fetching data from
      fetch(`http://localhost:8000/api/chats`)
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then(data =>
          this.setState({
            chats: data,
            isLoading: false,
          })
        )
        // Catch any errors we hit and update the app
        .catch(error => this.setState({ error, isLoading: false }));
    }

  componentDidMount() {

    this.fetchUsers()

  }

  render() {
    const { isLoading, chats, error } = this.state;
    return (
      <React.Fragment>
        <h1>Random User</h1>
       
        {error ? <p>{error.message}</p> : null}
        
        {!isLoading ? (
          chats.map(chat => {
            const { id, parent, username, full_name, avatar, date, comment } = chat;
            return (
              <div key={username}>
                <img src={avatar} alt={username}></img>
                <p>id: {id} </p>
                <p>parent id: {parent} </p>
                <p>id: {id} </p>                
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
      </React.Fragment>
    );
  }
  
}

export default App;
