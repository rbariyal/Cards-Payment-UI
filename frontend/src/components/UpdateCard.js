import React from 'react';
import styled from "styled-components";
import MaskedInput from "react-text-mask";
import axios from '../axios'
import {
  EXPIRYDATE,

} from "../constant"
import {
  stripeCardExpirValidation,
  textWithSpacesOnly,
 
} from "../validations"

const reducer = (state, action) => {
  console.log("action", action.data);
  switch (action.type) {
    case "cardHolder":
      return { ...state, cardHolder: action.data };
    case "expiry":
      return { ...state, expiry: action.data };
    case "cleanState":
      return { ...action.data };
    default:
      return state;
  }
};
// const [Edit,setEdit]=useState(false);

function UpdateCard(props)
{
 
const [errors, setErrors] = React.useState({});
const [updatedcard,setUpdatedCard]=React.useReducer(reducer,{
  cardHolder: "",
  expiry: ""
})



  const handleValidations=(type, value)=>
{
  let errorText;
  switch (type)
  {
    case "cardHolder":
      errorText=value==="" ? "Required": textWithSpacesOnly(value);
      setErrors({ ...errors, cardHolderError: errorText });
      break;
    case "expiry":
      errorText=value==="" ? "Required" : stripeCardExpirValidation(value);
      setErrors({ ...errors, expiryError: errorText });
     break;
      default:
        break;
  }
}

const handleBlur=(e)=>
{
  handleValidations(e.target.name,e.target.value)
}




  const handleInputData=(e)=>
  {
    setUpdatedCard({
      type:e.target.name,data:e.target.value
    })
  }

  const Updatedata=()=>
  {
  
   axios
      .put(`/cards/update/${props.id}`,{...updatedcard})
      .then(()=>
      {
        setUpdatedCard(
          {
            type:"cleanState",
            data: {
              cardHolder: "",
              expiry: ""
            } 
          }
        )
        props.Fetchdata();
      })
      .catch((err)=>alert(err.message));   
      // props.setEdit(!props.Edit); 
     
}


  return <><Update>

       <p>CardHolder's Name</p>
      <input type="text"
       required
       name='cardHolder'
       onChange={handleInputData}
placeholder="Enter cardholder's name"
       value={updatedcard.cardHolder}
        onBlur={handleBlur}
       />
        {errors &&
                errors.cardHolderError &&
                errors.cardHolderError.length > 1 && (
                  <Error>{errors.cardHolderError}</Error>
                )}
    
      <p>Expiry Date:</p>
         <MaskedInput
        mask={EXPIRYDATE}
        name="expiry"
        required
        placeholderChar={"\u2000"}
        placeholder="MM/YY"
      onChange={handleInputData}
            value={updatedcard.expiry}
              onBlur={handleBlur}
            />
              {errors &&
                    errors.expiryError &&
                    errors.expiryError.length > 1 && (
                      <Error>{errors.expiryError}</Error>
                    )}
    
  <Button onClick={Updatedata}>Update</Button>
  </Update>
   
  </>
}
const Update=styled.div`
display:flow-root;
 label {
    font-size: 14px;

    margin-left: 18px;
    margin-right: 18px;

  }
  button
  {
    margin-left:20px
  }
 `

 const Button = styled.button`
 
 background-color:#00FFFF;
 border: 2px solid black;
 border-radius:4px;
 margin:5px;
 
`;


const Error = styled.span`
font-size: 13px;
font-weight: bold;
color: red;
`;

export default UpdateCard;