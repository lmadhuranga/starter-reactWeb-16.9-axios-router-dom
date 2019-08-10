import React from 'react'
import axios from 'axios'
class Update extends React.Component {
  constructor(){
    super();
    this.state = { 
      name: '',
      email: '',
      id:0
    }
    
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  async getUser(userId){
    const response = await axios.get(`http://localhost:3000/users/${userId}`)
    return (response.data)
  }

  isUpdate(){
    const { params } = this.props.match;
    return (params.id !== undefined)?params.id:false;
  }
  
  componentDidMount(){
    const userId = this.isUpdate()
    if(userId) {
      this.getUser(userId)
      .then((response)=>{
          this.setState({
            id:response.id,
            email:response.email,
            name:response.name
          })
      })
    } 
  } 

  async createUser(newUser){
    const userId = this.isUpdate(); 
    if(userId){
      delete newUser['id']; 
      axios.put(
        `http://localhost:3000/users/${userId}`,
        newUser,
        { headers: { 'Content-Type': 'application/json' } }
      ).then((response)=>{
        console.log(response)
        this.redirect(response.data.id);
      });
    }
    else {
      axios.post(
        'http://localhost:3000/users',
        newUser,
        { headers: { 'Content-Type': 'application/json' } }
      ).then((response)=>{
        console.log(response)
        this.redirect(response.data.id);
      });
    }
  }

  redirect = (userId) => { 
    const { history } = this.props;
    history.push(`/view/${userId}`)
  }
 
  handleNameChange(event) { 
    this.setState({name: event.target.value}); 
  } 

  handleEmailChange(event) { 
    this.setState({email: event.target.value}); 
  }

  handleSubmit(event) {
    console.log(' submitted: ' , this.state);
    event.preventDefault(); 
    this.createUser(this.state)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label> 
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
        </label>
        <input onClick={this.onSubmit} type="submit" value="Submit" />
      </form>
    )
  }
}
export default Update