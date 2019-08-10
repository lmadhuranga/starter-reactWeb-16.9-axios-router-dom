import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Users extends React.Component {
  constructor(){
    super();
    this.state = { 
      users: []
    }
  }

  async getUsers(){
    const response = await axios.get("http://localhost:3000/users")
    return (response.data)
  }
  
  componentDidMount(){
    this.getUsers()
    .then((response)=>{
      this.setState({
         users:response
      })
    })
  } 

  render() {
    // const { url } = this.props.match
    let usersList = <li>No Users</li>
    if(this.state.users.length>0){
      usersList = this.state.users.map((user) =>{
        const contactUrl="/view/"+user.id  
        return(
          <li key={ user.id } xs={12}>
            {user.id} : <Link to={contactUrl} >{user.name} </Link> 
          </li>
        );
      });
    }

    return (
      <div>
        <h1>Users</h1>
        <strong>Select a user</strong>
        <ul>
         {usersList}
        </ul>
      </div>
    );
  }
}
export default Users