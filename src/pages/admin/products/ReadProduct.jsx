import React from "react";
import { useParams } from "react-router-dom";

export default function ReadProduct() {
  let params = useParams();
  return (
    <>
      <div>ReadProduct</div>
      <span>{params.id}</span>
    </>
  );
}
