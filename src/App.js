import React, { Component } from 'react';
import './App.css';
import Collapsible from './Collapsible';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      contacts: []
    }
  }

  fetchData(){
    this.setState({
      isLoading: true,
      contacts: []
    });

    fetch('https://randomuser.me/api/?results=50&nat=us,dk,fr')
         .then(response => response.json())
         .then(data => data.results.map(user => (
             {
               name: `${user.name.first[0].toUpperCase()}${user.name.first.substr(1)} ${user.name.last[0].toUpperCase()}${user.name.last.substr(1)}`,
               username: `${user.login.username}`,
               email: `${user.email}`,
               location: `${user.location.street.number}, ${user.location.street.name}, ${user.location.city}`
             }
           )))
         .then(contacts => this.setState({
           isLoading: false,
           contacts
         }))
         .catch(error => console.log(error));
  }

  componentWillMount(){
    if (localStorage.getItem('contacts')){
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')),
        isLoading: false
      })
    }
  }

  componentDidMount(){
    const date = localStorage.getItem('contactsDate');
    const contactsDate = date && new Date(parseInt(date));
    
    const now = new Date();
    const dataAge = Math.round((now - contactsDate) / (1000 * 60)); // value in minutes
    const tooOld = dataAge >= 5; 

    if (tooOld){
       this.fetchData();
    } else {
      console.log(`Uding data from localStorage that are ${dataAge} minutes old.`);
    }
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('contacts', JSON.stringify(nextState.contacts));
    localStorage.setItem('contactsDate', Date.now());
  }

  render() {
    const { isLoading, contacts } = this.state;
    return (
      <div>
        <header className="my-3">
          <h1>
            Fetch Data: randomuser.me
            <button className="btn btn-sm btn-danger" 
                    onClick={(e) => this.fetchData(e)}>Fetch</button>
          </h1>
        </header>
        <div className={`content mx-auto ${isLoading ? 'is-loading' : ''}`}>
          { !isLoading && contacts.length ? contacts.map(contact => {
            const { username, name, email, location } = contact;
            return (
              <Collapsible key={username} title={name}>
                <p>{email}<br/>{location}</p>
              </Collapsible>
            )
          }) : null }
          <div className="loader">
            <div className="icon">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
