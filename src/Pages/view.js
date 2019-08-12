import React from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { appConfig } from '../config/globel.conf'
import UpdateBtnCmp from '../components/updateBtnCmp';

class User extends React.Component {
    constructor(){
        super();
        this.state = { 
            user: {}
        } 
    }

    async getUser(userId){
        const response = await axios.get(`${appConfig.app.host.url}/contacts/${userId}`)
        return (response.data)
    }

    componentDidMount(){
        const { params } = this.props.match
        this.getUser(params.id)
        .then((response)=>{
            this.setState({
                user:response
            })
        })
    } 

    render() { 
        const { user } = this.state;
        const { params } = this.props.match
        return (
            <div>
                <h1>User Details</h1>
                <ul>
                    <li>Id : {user.id}</li>
                    <li>Name : {user.name}</li>
                    <li>Email : {user.email}</li>
                </ul>
                <UpdateBtnCmp userId={params.id}></UpdateBtnCmp>  &nbsp;
                <Link className="btn btn-primary" to={"/contacts"} >Home</Link>    
              
            </div>)
        }
    }
    export default User