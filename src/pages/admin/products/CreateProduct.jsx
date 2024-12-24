import React, { useState, useEffect, useContext, useRef } from "react";
import { object, string, number, array } from "yup";
import { SnackBarContext } from "../../../contexts/SnackBarContext";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import { HiMiniPlus } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

import apis from "../../../apis";

import NormalInput from "../../../components/forms/NormalInput";
import NormalTextarea from "../../../components/forms/NormalTextarea";
import ProductStatus from "../../../components/icons/ProductStatusIcon";
import ProductFooter from "../../../components/layouts/admin/ProductFooter";
import NormalDropdown from "../../../components/dropdowns/NormalDropdown";

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
const requiredImage = string()
  .required("Image không được để trống")
  .url("Image phải là đường dẫn");

const userSchema = object({
  name: string().required("Name không được để trống"),
  description: string()
    .required("Description không được để trống")
    .max(255, "Description phải ít hơn 255 ký tự"),
  image: array().of(requiredImage),
  price: number()
    .integer("Price phải là số thập phân.")
    .required("Price không được để trống"),
  // category: number()
  //   .required("Category không được để trống"),
});

export default function CreateProduct() {
  const [formData, setformData] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [loadingCate, setLoadingCate] = useState(false);
  const [listCate, setListCate] = useState([]);
  const [imageArr, setImageArr] = useState([]);

  const listProductStatus = [
    {
      id: 4,
      name: "Draft",
    },
    {
      id: 1,
      name: "Published",
    },
    {
      id: 2,
      name: "Low Stock",
    },
    {
      id: 3,
      name: "Out of Stock",
    },
  ];

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
  // const imageInput = useRef(null);
  const priceInput = useRef(null);
  const categoryInput = useRef(null);

  let navigate = useNavigate();
  const submit = () => {
    setLoadingCreate(true);
    //set useRef flag when submit button is clicked
    isSubmit.current = true;

    userSchema
      .validate(formData, { abortEarly: false })
      .then(function (value) {
        apis.products
          .create(formData)
          .then(
            (res) => {
              // thành công
              addSnack("success", "Tạo mới Product thành công");
              console.log(`create product -`);
              console.log(formData);
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
          addSnack("error", "Tạo mới Product thất bại");
          errObj[o.path] = o.message;
        }); 
        // console.log(errObj);
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
        // if ("image" in errObj) {
        //   imageInput.current.classList.add("border-red-500");
        // } else {
        //   imageInput.current.classList.remove("border-red-500");
        // }
        if ("price" in errObj) {
          priceInput.current.classList.add("border-red-500");
        } else {
          priceInput.current.classList.remove("border-red-500");
        }
        // if ("category" in errObj) {
        //   console.log(`set red border for price box`);
        //   categoryInput.current.classList.add("border-red-500");
        // } else {
        //   categoryInput.current.classList.remove("border-red-500");
        // }
      })
      .finally(() => {
        setLoadingCreate(false);
        isSubmit.current = true;
      });
  };
  
  console.log(formData);
  useEffect(() => {
    setLoadingCate(true);

    apis.categories
      .getData()
      .then(
        (res) => {
          const { categories } = res.data.data;
          // xử lý categories nếu cần (Xử lý computed data)
          setListCate(categories);
        },
        (err) => {
          console.log(err);
        }
      )
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => {
        setLoadingCate(false);
      });
    return () => {};
  }, []);
  /**
   * Description
   *
   * Nhận vào một chuỗi là đường dẫn ảnh và update vào 'formData'
   *
   * @param {string} img
   * @returns {void}
   */

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
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
              Add Product
            </NormalButton>
          </div>
        </div>
        {/* data layout */}
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-3">
            {/* general information */}
            <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                General Information
              </div>
              <div>
                <div className="mb-3">
                  <NormalInput
                    reference={nameInput}
                    size="w-full"
                    type="text"
                    placeholder="Type product name here. . ."
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
                    placeholder="Type product description here. . ."
                    name="ProductDescription"
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

            {/* media */}
            <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                Media
              </div>
              <div>
                <div className="mb-3">
                  <NormalInput
                    // reference={imageInput}
                    size="w-full"
                    type="text"
                    placeholder="Drag and drop image here, or click add image"
                    name="CategoryImageOne"
                    updated={(_value) => {
                      // setImageArr(imageArr => [...imageArr, _value])
                      setImageArr((imageArr) => [...imageArr, _value]);
                      setformData({
                        ...formData,
                        images: imageArr,
                      });
                    }}
                  >
                    Photo
                  </NormalInput>
                  {/* {isSubmit.current ? (
                    <small className="text-red-500">
                      {errorsForm.image || ""}
                    </small>
                  ) : null} */}
                </div>
                <div className="mb-3 grid grid-cols-4">
                  {imageArr ? (
                    <>
                      {imageArr.map((img) => {
                        return (
                          <>
                            {img ? (
                              <img
                                src={img}
                                alt=""
                                key={img}
                                className="w-full h-[250px] object-cover col-span-1 rounded-lg"
                              />
                            ) : null}
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </div>
                <div></div>
              </div>
            </div>

            {/* pricing */}
            <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                Pricing
              </div>
              <div>
                <div className="mb-3">
                  <NormalInput
                    reference={priceInput}
                    size="w-full"
                    type="number"
                    min="0"
                    placeholder="Type product name here. . ."
                    name="ProductPrice"
                    updated={(_value) => {
                      setformData({
                        ...formData,
                        price: _value,
                      });
                    }}
                  >
                    Base Price
                  </NormalInput>
                  {isSubmit.current ? (
                    <small className="text-red-500">
                      {errorsForm.price || ""}
                    </small>
                  ) : null}
                </div>
              </div>
            </div>

            {/* iventory */}
            <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                Inventory
              </div>
              <div>
                <div className="mb-3 grid grid-cols-3 gap-[14px]">
                  <div className="col-span-1">
                    <NormalInput
                      size="w-full"
                      type="number"
                      min="0"
                      name="ProductQuantity"
                      placeholder="Type product quantity here. . ."
                      updated={(_value) => {
                        setformData({
                          ...formData,
                          quantity: _value,
                        });
                      }}
                    >
                      Quantity
                    </NormalInput>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            {/* Category */}
            <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                Category
              </div>
              <div>
                <div className="mb-3">
                  <div className="">
                    <NormalDropdown
                    reference={categoryInput}
                      listData={listCate}
                      placeholder="Select a category"
                      searchPlaceholder="Enter category name..."
                      updated={(_value) => {
                        setformData({
                          ...formData,
                          categoryId: _value,
                        });
                      }}
                    >
                      Product Category
                    </NormalDropdown>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="flex justify-between">
                <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                  Status
                </div>
                <ProductStatus item={formData.statusId} />
              </div>
              <div>
                <div className="mb-3">
                  <div className="">
                    <NormalDropdown
                      listData={listProductStatus}
                      loading={loadingCate}
                      placeholder="Select a status"
                      searchPlaceholder="Enter status name..."
                      updated={(_value) => {
                        setformData({
                          ...formData,
                          statusId: _value,
                        });
                      }}
                    >
                      Product Status
                    </NormalDropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
