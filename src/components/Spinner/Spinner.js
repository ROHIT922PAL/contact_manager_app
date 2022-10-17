import React from 'react'
import spinnerImg from "../../assets/img/loading.gif"

const Spinner = () => {
  return (
    <>
   <img src={spinnerImg}  alt="" className='d-block m-auto' style={{width: "150px"}}/>
      
    </>
  )
}

export default Spinner;
