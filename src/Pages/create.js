import React from 'react'
import axios from 'axios'
class Create extends React.Component {
  constructor(){
    super();
    this.state = { 
      name: '',
      email: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async createUser(newUser){ 
      axios.post(
        'http://localhost:3000/users',
        newUser,
        { headers: { 'Content-Type': 'application/json' } }
      ).then((response)=>{
        console.log(response)
        this.redirect(response.data.id);
      })
  }

  redirect = (userId) => { 
    const { history } = this.props;
    history.push(`/view/${userId}`)
  }

  componentDidMount(){
       
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
export default Create