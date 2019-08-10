import React from 'react'
import { Link } from 'react-router-dom' 
class Users extends React.Component {
  constructor(){
    super();
    this.state = { 
      users: [{
        id:1,
        name:"Madhuranga"
      },
      {
        id:2,
        name:"Randika"
      }]
    }
  }

  render() {
    // const { url } = this.props.match
    let usersList = this.state.users.map((user) =>{
      const contactUrl="/user/"+user.id  
      return(
        <li key={ user.id } xs={12}>
          {user.id} : <Link to={contactUrl} >{user.name} </Link>
        </li>
      );
    });

    return (
      <div>
        <h1>Users</h1>
        <strong>select a user</strong>
        <ul>
         {usersList}
        </ul>
      </div>
    );
  }
}
export default Users