import React from 'react'; 
import { withRouter } from "react-router";

class UpdateBtnCmp extends React.Component {
  
  handlerClick = () => {  
    const { history, userId } = this.props;
    history.push(`/update/${userId}`)
  }
    
  render() { 
    return (
      <button className="btn btn-sm btn-primary" onClick={(e) => this.handlerClick()}>Update <i className="fas  fa-edit"></i></button> 
    )
  }
}
export default withRouter(UpdateBtnCmp)