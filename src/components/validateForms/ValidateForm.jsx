import React, { useRef } from "react";
import { object, string } from "yup";

export default function ValidateForm() {
  const userSchema = object({
    name: string().required("Name không được để trống"),
    description: string()
      .required("Description không được để trống")
      .max(255, "Description phải ít hơn 255 ký tự"),
    image: string()
      .required("Image không được để trống")
      .url("Image phải là đường link"),
  });

  return userSchema;
}
