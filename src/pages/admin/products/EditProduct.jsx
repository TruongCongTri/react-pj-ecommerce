import React from 'react'
import { useParams } from 'react-router-dom'
export default function UpdateProduct() {
    let params = useParams();
  return (
    <>
    <div>UpdateProduct</div>
    <span>{params.id}</span>

    </>
  )
}
