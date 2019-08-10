import React from 'react'
import axios from 'axios'
class Update extends React.Component {
  constructor( ) {
    super( );
    this.state = {
      contact :{
        id:0,
        name: '',
        email: ''
      }
    }
    
    this.handleFieldFiller = this.handleFieldFiller.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  async getUser(userId){
    const response = await axios.get(`http://localhost:3000/users/${userId}`)
    return (response.data)
  }

  isUpdate(){
    const { params } = this.props.match;
    return (params.id !== undefined) ? params.id : false;
  }
  
  componentDidMount(){
    const userId = this.isUpdate()
    if(userId) {
      this.getUser(userId)
      .then((response)=>{
          this.setState({
            contact:{
              id:response.id,
              email:response.email,
              name:response.name
            }
          })
      })
    } 
  } 

  async createUser(newContact){
    const userId = this.isUpdate(); 
    if(userId){
      delete newContact['id']; 
      axios.put(
        `http://localhost:3000/users/${userId}`,
        newContact,
        { headers: { 'Content-Type': 'application/json' } }
      ).then((response)=>{
        console.log(response)
        this.redirect(response.data.id);
      });
    }
    else {
      axios.post(
        'http://localhost:3000/users',
        newContact,
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
  
  handleFieldFiller(event) {
    event.preventDefault();
    let fieldName = event.target.name;
    let fieldValue = event.target.value;
    console.log('form data', {[fieldName]: fieldValue });
    console.log('state data', this.state.contact);
    this.setState( prevState => ({ 
      contact : { ...prevState.contact, [fieldName]: fieldValue }
    })); 
  }

  handleSubmit(event) { 
    event.preventDefault(); 
    this.createUser(this.state.contact)
  }

  render() {
    let { contact } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input name="name" type="text" value={contact.name} onChange={this.handleFieldFiller} />
        </label> 
        <label>
          Email:
          <input name="email" type="text" value={contact.email} onChange={this.handleFieldFiller} />
        </label>
        <input onClick={this.onSubmit} type="submit" value="Submit" />
      </form>
    )
  }
}
export default Update