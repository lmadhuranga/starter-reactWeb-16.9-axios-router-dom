import React from 'react';
import axios from 'axios';

class User extends React.Component {
    constructor(){
        super();
        this.state = { 
            user: {}
        }
    }

    async getUser(userId){
        const response = await axios.get(`http://localhost:3000/users/${userId}`)
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
        return (
            <div>
                <h1>User Details</h1>
                <h3>Name : {user.name}</h3>
            </div>)
        }
    }
    export default User