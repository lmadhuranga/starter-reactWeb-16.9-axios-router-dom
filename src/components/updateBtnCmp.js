import React from 'react'; 
import { withRouter } from "react-router";

class UpdateBtnCmp extends React.Component {
  constructor(){
    super(); 
  } 
  
  handlerClick = () => {  
    const { history, userId } = this.props;
    history.push(`/update/${userId}`)
  }
    
  render() { 
    return (
      <div> 
        <button onClick={(e) => this.handlerClick()}>U</button>
      </div>
    )
  }
}
export default withRouter(UpdateBtnCmp)