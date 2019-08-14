import React from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { appConfig } from '../config/globel.conf'

class Contacts extends React.Component {
  constructor(){
    super();
    this.state = { 
      contacts: []
    }
  }

  updateContactsData(){
    this.getContacts()
    .then((response)=>{
      this.setState({
        contacts:response
      });
    });
  }

  async getContacts(){
    const response = await axios.get(`${appConfig.app.host.url}/contacts`);
    console.log('response',response);
    return (response.data);
  }

  async handlerDelete(contactId){
    if(window.confirm("Are you sure to delete contact")) { 
      axios.delete(`${appConfig.app.host.url}/contacts/${contactId}`)
      .then(response => { 
        this.updateContactsData();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  
  componentDidMount(){
    this.updateContactsData();
  } 

  render() {
    // const { url } = this.props.match
    let contactsList = <tr><td colSpan="2">No Contacts</td></tr>;
    if(this.state.contacts.length>0){
      contactsList = this.state.contacts.map((contact) =>{ 
        return(
          <tr key={ contact.id }>
            <td>
              {contact.id} : {/*  */} 
              <Link to={"/view/"+contact.id} >{contact.name} </Link> 
            </td>
            <td>
              <Link className="btn btn-sm btn-info" to={"/view/"+contact.id} ><i className="fas fa-eye"></i></Link> &nbsp; | &nbsp;  
              <Link className="btn btn-sm btn-info" to={"/update/"+contact.id} ><i className="fas fa-edit"></i> </Link> &nbsp; | &nbsp;   
              <button onClick={(e) => this.handlerDelete(contact.id)}  className="btn btn-sm btn-danger" >
                <i className="fas fa-trash"></i> 
              </button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <h1>Contacts</h1> 
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contactsList}
          </tbody>
        </table>
        <ul>
         
        </ul>
      </div>
    );
  }
}
export default Contacts;