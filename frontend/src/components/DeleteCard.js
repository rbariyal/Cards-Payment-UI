import React from 'react';
import styled from "styled-components";
import {FaTrashAlt} from 'react-icons/fa';
import axios from '../axios';

function DeleteCard(props)
{

const Deletecard=(e)=>
    {
      e.preventDefault();
     axios
        .delete(`/cards/delete/${props.id}`,props.id)
        .then(()=>
        {
            console.log("delete successfully");
            props.Fetchdata();
        })
        .catch((err)=>alert(err.message));
           
}


    return (
  <Trash onClick={Deletecard}></Trash>
    )
}


const Trash=styled(FaTrashAlt)`
 height:20px;
  width:20px;
  padding:20px 8px 0 8px
`;

export default DeleteCard;



