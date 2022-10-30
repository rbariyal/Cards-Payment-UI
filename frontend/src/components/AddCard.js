import React from 'react';
import axios from '../axios';
import MaskedInput from "react-text-mask";

import styled from "styled-components";
import {
  OTHERCARDS,
  EXPIRYDATE,

} from "../constant"

import {
  stripeCardNumberValidation,
  stripeCardExpirValidation,
  textWithSpacesOnly,
 
} from "../validations"



const reducer = (state, action) => {
  console.log("action", action.data);
  switch (action.type) {
    case "card":
      return { ...state, card: action.data };
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



function AddCard(props) {

  const [error, setError] = React.useState({});

  const [state,dispatch]=React.useReducer(reducer,{
    card: "",
    cardHolder: "",
    expiry: ""
  })
   

const handleValidations=(type, value)=>
{
  let errorText;
  switch (type)
  {
    case "card":
      errorText=value==="" ? "Required" : stripeCardNumberValidation(value);
      setError({ ...error, cardError: errorText });
      break;
    case "cardHolder":
      errorText=value==="" ? "Required": textWithSpacesOnly(value);
      setError({ ...error, cardHolderError: errorText });
      break;
    case "expiry":
      errorText=value==="" ? "Required" : stripeCardExpirValidation(value);
      setError({ ...error, expiryError: errorText });
break;
      default:
        break;
  }
}

const handleInputData=(e)=>
{
  dispatch({
    type:e.target.name, data:e.target.value
  })
}

const openCard=(e)=>
{
  e.preventDefault();
  props.setCard(!props.addCard);
}

const handleBlur=(e)=>
{
  handleValidations(e.target.name,e.target.value)
}

const checkErrorBeforeSave = () => {
  let errorValue = {};
  let isError = false;
  Object.keys(state).forEach(async (val) => {
    if (state[val] === "") {
      errorValue = { ...errorValue, [`${val + "Error"}`]: "Required" };
      isError = true;
    }
  });
  setError(errorValue);
  return isError;
}

const addCard=(e)=>
    {
      e.preventDefault();
      let errorCheck=checkErrorBeforeSave();
      if(!errorCheck)
      {
     axios
        .post("/cards/add",{...state})
        .then(()=>
        {
           dispatch(
            {
              type:  "cleanState",
              data: {
                card: "",
                cardHolder: "",
                expiry: ""
              } 
            }
           )
            
        })
        .catch((err)=>alert(err.message));
        props.setCard(!props.addCard);
        props.setsaveCard(false);
      }
    
   
}
  return (
    
      <Container>
 <Add onClick={openCard}>
  Add a new card
   </Add>

      {props.addCard && (
        <>
        <ChildContainer>
<InputContainer>
      <p>Card Number:</p>
       <MaskedInput
         mask={OTHERCARDS}
         name="card"
         guide={false}
         placeholderChar={'\u2000'}
         placeholder="Enter card number"
         required
         onChange={handleInputData}
         value={state.card}
          onBlur={handleBlur}
         />
          {error && error.cardError && error.cardError.length > 1 && (
                        <Error>{error.cardError}</Error>
                      )}
       
        </InputContainer>

<InputContainer>
       <p>CardHolder's Name</p>
      <input type="text"
      name='cardHolder'
       required
       placeholder="Enter cardholder's name"
       onChange={handleInputData}
       value={state.cardHolder}
        onBlur={handleBlur}
       />
        {error &&
                error.cardHolderError &&
                error.cardHolderError.length > 1 && (
                  <Error>{error.cardHolderError}</Error>
                )}
      </InputContainer>

<InputContainer>
      <p>Expiry Date:</p>
         <MaskedInput
        mask={EXPIRYDATE}
        name="expiry"
        required
        placeholderChar={"\u2000"}
        placeholder="MM/YY"
      onChange={handleInputData}
            value={state.expiry}
              onBlur={handleBlur}
            />
              {error &&
                    error.expiryError &&
                    error.expiryError.length > 1 && (
                      <Error>{error.expiryError}</Error>
                    )}
       </InputContainer>

          </ChildContainer>
          
          <Button onClick={addCard}>
            Add Card
          </Button>
         </>
      )}
      
       

      </Container>

  );
}

const Container = styled.div`
margin:30px 10px 0 10px;
 height: fit-content;
 border-radius: 8px;
 border:1px solid grey;

`;

const ChildContainer=styled.div`
display:flex
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  p {
    font-size: 14px;
    font-weight: 600;
  }
  input {
    width: 55%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;
    &:hover {
      border: 1px solid orange;
    }
  }
`;

const Button = styled.button`
  width: 20%;
  height: 35px;
  background-color:#00FFFF;
  border: none;
  outline: none;
  border-radius: 10px;
  margin:10px;
  
`;

 const Error = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: red;
`;



const Add = styled.button`
  display: flex;
  align-items: center;
  width:100%;
  height: 60px;
  color: black;
padding:0 0 0 10px;
  cursor: pointer;
  `;


export default AddCard;