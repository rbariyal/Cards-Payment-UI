import React,{useState}from "react";
import AddCard from "./components/AddCard";
import styled from "styled-components";
import SavedCards from "./components/SavedCards";


// import axios from 'axios'

function App()
{


const [addCard, setCard] = useState(false);
const [saveCard, setsaveCard] = useState(false);


return (

<Container>
<Title>Payment Options</Title>
<Descrption>An overview of your payment-methods</Descrption>
<SavedCards saveCard={saveCard}
        setsaveCard={setsaveCard}
     > </SavedCards>
<AddCard
 addCard={addCard}
        setCard={setCard}
        saveCard={saveCard}
        setsaveCard={setsaveCard}
       
></AddCard>
</Container>
);

}

 const Container = styled.div`
 margin:0 auto;
    width:70vw;
  height: fit-content;
  background-color:white;
  padding-bottom:30px
`;

const Title=styled.p`
font-size:30px;
padding: 10px 0 0 10px;
margin:0;

`
const Descrption=styled.p`
margin:0;
padding:0 0 0 10px;
`

export default App;
