import React from 'react';
import axios from 'axios';
import { appConfig } from '../config/globel.conf'

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
    const response = await axios.get(`${appConfig.app.host.url}/contacts/${userId}`)
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
        `${appConfig.app.host.url}/contacts/${userId}`,
        newContact,
        { headers: { 'Content-Type': 'application/json' } }
      ).then((response)=>{
        console.log(response)
        this.redirect(response.data.id);
      });
    }
    else {
      axios.post(
        `${appConfig.app.host.url}/contacts`,
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
        <div className="form-group col-md-6">
          <label htmlFor="name">Name</label>
          <input type="name" name="name" className="form-control" value={contact.name} onChange={this.handleFieldFiller} aria-describedby="nameHelp" placeholder="Enter Name" />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" className="form-control" value={contact.email} onChange={this.handleFieldFiller} aria-describedby="nameHelp" placeholder="Enter Email" />
        </div> 
        <button onClick={this.onSubmit} type="submit" className="btn btn-sm btn-primary mb-2">Save <i className="fas fa-save"></i></button>
      </form>
    )
  }
}
export default Update