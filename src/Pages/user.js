import React from 'react'  
class User extends React.Component {
  render() {
    const { params } = this.props.match
    console.log(this.props)
    return (
      <div>
          <h1>User Details</h1>
          <h3>hell0 id: {params.id}</h3>
      </div>
    )
  }
}
export default User