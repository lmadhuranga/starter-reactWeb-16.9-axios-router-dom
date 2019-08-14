import React from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { appConfig } from '../config/globel.conf'
import UpdateBtnCmp from '../components/updateBtnCmp';

class User extends React.Component {
    constructor(){
        super();
        this.state = { 
            contact: {}
        } 
    }

    async getUser(contactId){
        const response = await axios.get(`${appConfig.app.host.url}/contacts/${contactId}`)
        return (response.data)
    }

    componentDidMount(){
        const { params } = this.props.match
        this.getUser(params.id)
        .then((response)=>{
            this.setState({
                contact:response
            })
        })
    } 

    render() { 
        const { contact } = this.state;
        // const { params } = this.props.match;
        
        if(contact.name===undefined) 
            return(<div>Loading...</div>);

        return (
            <div>
                <h1>User Details</h1>
                <ul>
                    <li>Id : {contact.id}</li>
                    <li>Name : {contact.name}</li>
                    <li>Email : {contact.email}</li>
                    <li>Mobile : {contact.mobile}</li>
                </ul>
                <UpdateBtnCmp contactId={contact.id}></UpdateBtnCmp>  &nbsp;
                <Link className="btn btn-primary" to={"/contacts"} >Home</Link>
            </div>);
        }
    }
    export default User;