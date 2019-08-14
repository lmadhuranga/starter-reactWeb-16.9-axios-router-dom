import React from 'react'; 
import { withRouter } from "react-router";

class UpdateBtnCmp extends React.Component {
  
  handlerClick = () => {  
    const { history, contactId } = this.props;
    history.push(`/update/${ contactId }`)
  }
    
  render() { 
    return (
      <button className="btn btn-sm btn-primary" onClick={(e) => this.handlerClick()}>Update <i className="fas  fa-edit"></i></button> 
    )
  }
}
export default withRouter(UpdateBtnCmp)