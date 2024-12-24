import React, { useState, useContext, useRef } from "react";
import { object, string } from "yup";
import { SnackBarContext } from "../../../contexts/SnackBarContext";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import { HiMiniPlus } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

import apis from "../../../apis";

import NormalInput from "../../../components/forms/NormalInput";
import NormalTextarea from "../../../components/forms/NormalTextarea";

// validate client input data
// (Formik + Yup|Joi) | (Formix) | (Yup)

/**
 * Description
 *
 * YUP schema đặt điều kiện cho formData.
 * Phải nhập name, desc, image;
 *  desc phải ít hơn 255 ký tự,
 *  image phải là một đường dẫn url
 *
 */
const userSchema = object({
  name: string().required("Name không được để trống"),
  description: string()
    .required("Description không được để trống")
    .max(255, "Description phải ít hơn 255 ký tự"),
  image: string()
    .required("Image không được để trống")
    .url("Image phải là đường dẫn"),
});

export default function CreateCategory() {
  const [formData, setformData] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const [loadingCreate, setLoadingCreate] = useState(false);

  const { addSnack } = useContext(SnackBarContext);

  //1. useRef: ghi nhớ 1 state mà không bị update theo re-render
  const isSubmit = useRef(false);
  //2. useRef: ghi nhớ 1 jsx element

  /**
   * Description:
   *
   * Thông báo tại ô name input, viền đỏ khi kiểm tra có lỗi nhập liệu
   *
   */
  const nameInput = useRef(null);
  const descInput = useRef(null);
  const imageInput = useRef(null);

  let navigate = useNavigate();
  const submit = () => {
    setLoadingCreate(true);

    //set useRef flag when submit button is clicked
    isSubmit.current = true;

    userSchema
      .validate(formData, { abortEarly: false })
      .then(function (value) {
        console.log(value); // returns person object
        apis.categories
          .create(formData)
          .then(
            (res) => {
              // thành công
              addSnack("success", "Tạo mới Category thành công");
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
        const errObj = {};
        err.inner.map((o) => {
          addSnack("error", "Tạo mới Category thất bại");
          errObj[o.path] = o.message;
        });
        console.log(errObj);

        setErrorsForm(errObj);
        if ("name" in errObj) {
          nameInput.current.classList.add("border-red-500");
        } else {
          nameInput.current.classList.remove("border-red-500");
        }
        if ("description" in errObj) {
          descInput.current.classList.add("border-red-500");
        } else {
          descInput.current.classList.remove("border-red-500");
        }
        if ("image" in errObj) {
          imageInput.current.classList.add("border-red-500");
        } else {
          imageInput.current.classList.remove("border-red-500");
        }
      })
      .finally(() => {
        setLoadingCreate(false);
        isSubmit.current = true;
      });
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
      {/* btn */}
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
      {/* data layout */}
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
              <div className="mb-3"></div>
              <div className="mb-3">
                <NormalInput
                  reference={nameInput}
                  size="w-full"
                  type="text"
                  placeholder="Type category name here. . ."
                  name="CategoryName"
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
