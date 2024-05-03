import React from 'react'

function Alert(props) {
    const capitalize=(word)=>{
        if(word==="danger")
        {
            word= "error"
        }
        
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);//extracts the rest of the word starting from the second character (index 1) until the end
    }
    
  return (
    
    props.alert && <div className="alert alert-success alert-dismissible fade show" role="alert">
  <strong>{capitalize(props.alert.type)}</strong>: {capitalize(props.alert.msg)}</div>
      
  )
}

export default Alert


