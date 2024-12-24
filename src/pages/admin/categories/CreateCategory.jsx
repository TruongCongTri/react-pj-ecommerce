import React, { useState, useContext, useRef } from "react";
import { object, string } from "yup";
import { SnackBarContext } from "../../../contexts/SnackBarContext";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import { HiMiniPlus } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

import apis from "../../../apis";

import FileUploader from "../../../components/forms/FileUploader";
import NormalInput from "../../../components/forms/NormalInput";
import NormalTextarea from "../../../components/forms/NormalTextarea";

export default function CreateCategory() {
  const [formData, setformData] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const [loadingCreate, setLoadingCreate] = useState(false);

  const { addSnack } = useContext(SnackBarContext);

  //1. useRef: ghi nhớ 1 state mà không bị update theo re-render
  const isSubmit = useRef(false);
  //2. useRef: ghi nhớ 1 jsx element
  const nameInput = useRef(null);
  const descInput = useRef(null);
  const imageInput = useRef(null);

  let navigate = useNavigate();
  const submit = () => {
    setLoadingCreate(true);

    //set useRef flag when submit button is clicked
    isSubmit.current = true;

    // validate client input data
    // (Formik + Yup|Joi) | (Formix) | (Yup)
    const userSchema = object({
      name: string().required("Name không được để trống"),
      description: string().required("Description không được để trống").max(255, "Description phải ít hơn 255 ký tự"),
      image: string().required("Image không được để trống").url("Image phải là đường link"),
    });
    // const errors = userSchema.validate(formData);

    userSchema
      .validate(formData)
      .then(function (value) {
        console.log(value); // returns person object
        nameInput.current.classList.remove("border-red-500");
        descInput.current.classList.remove("border-red-500");
        imageInput.current.classList.remove("border-red-500");
        apis.categories
          .create(formData)
          .then(
            (res) => {
              // thành công
              addSnack("success", "Create category success");
              // navigate("/admin/categories");
              navigate(-1);
            },
            (err) => {
              addSnack("error", err.response.data.message || "error");
              console.log(err);
            }
          )
          .catch((err) => {
            addSnack("error", JSON.stringify(err) || "error");
            console.log(err);
          });
      })
      .catch(function (err) {
        console.log(err.message);
        addSnack("error", err.message);
        setErrorsForm({
          name: "Name không được để trống",
          description: "Description không được để trống",
          image: "Image phải là link",
        });
        
        // setTimeout(() => {
        //   setLoadingCreate(false);
        // }, 1000);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingCreate(false);
        }, 1000);
      });;

    // if (userSchema.validate(formData)) {
    //   addSnack("error", "Category name is required!");
    //   setErrorsForm({
    //     name: "Name không được để trống",
    //     description: "Description không được để trống",
    //     image: "Image phải là link",
    //   });
    //   nameInput.current.classList.add("border-red-500");
    //   nameInput.current.focus();
    //   descInput.current.classList.add("border-red-500");
    //   descInput.current.focus();
    //   imageInput.current.classList.add("border-red-500");
    //   imageInput.current.focus();
    //   setTimeout(() => {
    //     setLoadingCreate(false);
    //   }, 1000);
    //   return;
    // }
    // if (!formData.name) {
    //   addSnack('error', 'Category name is required!');
    //   setErrorsForm({
    //     name: "Name cannot be empty",})
    //   nameInput.current.classList.add("border-red-500");
    //   nameInput.current.focus();
    //   setTimeout(() => {
    //     setLoadingCreate(false);
    //   }, 1000);
    //   return;
    // }
  };

  /**
   * Description
   *
   * Nhận vào một chuỗi là đường dẫn ảnh và update vào 'formData'
   *
   * @param {string} img
   * @returns {void}
   */

  const handleCancel = () => {
    // navigate("/admin/categories");
    navigate(-1);
  };

  return (
    <div className="mx-6 my-8 ">
      <div className="flex justify-between mb-6">
        <div>
          <BreadCrumb />
        </div>
        <div className="flex gap-x-4 items-end ">
          <NormalButton
            color="bg-[#F9F9FC]"
            text="text-neutral-400"
            border="border border-neutral-400"
            type="submit"
            icon={<HiMiniXMark />}
            iconStyle="size-5 "
            onClick={handleCancel}
            isDisabled={loadingCreate}
          >
            Cancel
          </NormalButton>

          <NormalButton
            color="bg-[#5C59E8]"
            text="text-white"
            border="border border-[#5C59E8]"
            type="submit"
            icon={<HiMiniPlus />}
            iconStyle="size-5"
            onClick={submit}
            loading={loadingCreate}
          >
            Add Category
          </NormalButton>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1 ">
          <div className="bg-white p-6 border border-neutral-100 rounded-lg">
            <div className="text-neutral-800 font-medium text-lg pb-[14px]">
              Thumbnail
            </div>
            <div>
              <div className="mb-3">
                <NormalInput
                  reference={imageInput}
                  size="w-full"
                  type="text"
                  placeholder="Drag and drop image here, or click add image"
                  name="CategoryImage"
                  updated={(_value) => {
                    setformData({
                      ...formData,
                      image: _value,
                    });
                  }}
                >
                  Photo
                </NormalInput>
                {isSubmit.current ? (
                  <small className="text-red-500">
                    {errorsForm.image || ""}
                  </small>
                ) : null}
              </div>
              <div className="mb-3">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt=""
                    className="w-full h-[250px] object-cover rounded-lg"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 ">
          {/* general information */}
          <div className="bg-white p-6 border border-neutral-100 rounded-lg">
            <div className="text-neutral-800 font-medium text-lg pb-[14px]">
              General Information
            </div>
            <div>
              <div className="mb-3">
                <NormalInput
                  reference={nameInput}
                  size="w-full"
                  type="text"
                  placeholder="Type category name here. . ."
                  name="Category Name"
                  updated={(_value) => {
                    setformData({
                      ...formData,
                      name: _value,
                    });
                  }}
                >
                  Category Name
                </NormalInput>
                {isSubmit.current ? (
                  <small className="text-red-500">
                    {errorsForm.name || ""}
                  </small>
                ) : null}
              </div>
              <div>
                <NormalTextarea
                  reference={descInput}
                  size="w-full "
                  rows="6"
                  type="text"
                  placeholder="Type category description here. . ."
                  name="Category Description"
                  updated={(_value) => {
                    setformData({
                      ...formData,
                      description: _value,
                    });
                  }}
                >
                  Description
                </NormalTextarea>
                {isSubmit.current ? (
                  <small className="text-red-500">
                    {errorsForm.description || ""}
                  </small>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
