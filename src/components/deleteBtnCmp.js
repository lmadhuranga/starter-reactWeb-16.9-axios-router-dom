import React from 'react';
import axios from 'axios'; 
import { withRouter } from "react-router";

class DeteleBtnCmp extends React.Component { 
  
  async handlerDelete(){
    const { userId } = this.props; 
    axios.delete(`http://localhost:3000/users/${userId}`)
    .then(response => { 
      this.redirectToHome();
    })
    .catch(error => {
      console.log(error);
    });
  }

  redirectToHome = () => { 
    const { history } = this.props;
    history.push('/users')
  }
  
  componentDidMount(){
  } 

  render() { 
    return (
      <div> 
        <button onClick={(e) => this.handlerDelete()}>x</button>
      </div>
    )
  }
}
export default withRouter(DeteleBtnCmp)