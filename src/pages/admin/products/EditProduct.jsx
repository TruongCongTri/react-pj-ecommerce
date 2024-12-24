import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { object, string, array, number } from "yup";

import { SnackBarContext } from "../../../contexts/SnackBarContext";

import { HiMiniXMark } from "react-icons/hi2";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import apis from "../../../apis";

import NormalInput from "../../../components/forms/NormalInput";
import NormalTextarea from "../../../components/forms/NormalTextarea";
// import NormalDropdown from "../../../components/dropdowns/NormalDropdown";
// import ProductStatus from "../../../components/icons/ProductStatusIcon";

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
// const requiredImage = string()
//  .required("Image không được để trống")
//  .url("Image phải là đường dẫn");

const userSchema = object({
  name: string().required("Name không được để trống"),
  description: string()
    .required("Description không được để trống")
    .max(255, "Description phải ít hơn 255 ký tự"),
  // image: array().of(requiredImage),
  price: number()
    .integer("Price phải là số thập phân.")
    .required("Price không được để trống"),
  // category: number()
  //   .required("Category không được để trống"),
});

export default function EditProduct() {
  // Lưu lại danh sách categories từ server
  // const [formData, setSingleData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [imageArr, setImageArr] = useState([]);
  const [errorsForm, setErrorsForm] = useState({});
  // Dùng để set state loading của table (first load hoặc searching)
  const [loadingGet, setLoadingGet] = useState(false);

  // trạng thái Loading cập nhật data
  const [loadingPost, setLoadingPost] = useState(false);

  const { addSnack } = useContext(SnackBarContext);

  //1.
  const isSubmit = useRef(false);
  //2.
  const nameInput = useRef(null);
  const descInput = useRef(null);
  // const imageInput = useRef(null);
  const priceInput = useRef(null);
  // const categoryInput = useRef(null);

  const params = useParams();
  let navigate = useNavigate();
  // load product data by id based on url parameter
  // then validate data and highlight with red border for each invalid input
  useEffect(() => {
    setLoadingGet(true);
    // set useRef flag when page is loaded
    isSubmit.current = true;

    apis.products
      .getSingleData(params.id)
      .then(
        (res) => {
          const { product } = res.data.data;
          // xử lý category nếu cần (Xử lý computed data)
          product.name = product.name || "";
          product.description = product.description || "";
          product.price = product.price || "";
          product.category = product.category || [];
          setFormData(product);
          setTimeout(() => {
            userSchema
              .validate(product, { abortEarly: false })
              .catch(function (err) {
                const errObj = {};
                err.inner.map((o) => {
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
                if ("price" in errObj) {
                  priceInput.current.classList.add("border-red-500");
                } else {
                  priceInput.current.classList.remove("border-red-500");
                }
              });
          }, 0);
        },
        (err) => {
          console.log(err);
        }
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingGet(false);
      });
    return () => {};
  }, []);

  useEffect(() => {
    // console.log("set image arr");
    // console.log(formData.images);
    setImageArr(formData.images);
  }, [formData.images]);

  // useEffect(() => {
  //   setLoadingCate(true);
  //   apis.categories
  //     .getData()
  //     .then(
  //       (res) => {
  //         const { categories } = res.data.data;
  //         // xử lý categories nếu cần (Xử lý computed data)
  //         setListCate(categories);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     )
  //     .finally(() => {
  //       setTimeout(() => {
  //         setLoadingCate(false);
  //       }, 5000);
  //     });
  // }, []);

  /**
   * Description
   *
   * Handle submit button to post formData of Product
   * with YUP validation before posting data
   *
   * @returns {void}
   *
   */
  const submit = () => {
    setLoadingPost(true);
    //set useRef flag when submit button is clicked
    isSubmit.current = true;

    userSchema
      .validate(formData, { abortEarly: false })
      .then(
        (value) => {
          console.log(value); // returns product object
          apis.products
            .update(params.id, formData)
            .then(
              (res) => {
                // thành công
                addSnack("success", "Cập nhật Product thành công");
                console.log(`Update Product - ${params.id}`);
                console.log(formData);
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
        },
        (err) => {
          console.log(err);
        }
      )
      .catch((err) => {
        const errObj = {};
        err.inner.map((o) => {
          addSnack("error", "Cập nhật Category thất bại");
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
        if ("price" in errObj) {
          priceInput.current.classList.add("border-red-500");
        } else {
          priceInput.current.classList.remove("border-red-500");
        }
      })
      .finally(() => {
        setLoadingPost(false);
        // isSubmit.current = false;
      });
  };

  /**
   * Description
   *
   * Navigate lùi về 1 trang
   * /products/:id
   *
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
              iconStyle="size-5"
              icon={<HiMiniXMark />}
              type="submit"
              onClick={handleCancel}
              isDisabled={formData.length !== 0 ? loadingPost : true}
            >
              Cancel
            </NormalButton>
            <NormalButton
              color="bg-[#5C59E8]"
              text="text-white"
              border="border border-[#5C59E8]"
              iconStyle="size-5"
              icon={<HiMiniWrenchScrewdriver />}
              type="submit"
              onClick={submit}
              isDisabled={formData.length !== 0 ? false : true}
              loading={loadingPost}
            >
              Edit Product
            </NormalButton>
          </div>
        </div>
        {/* data layout */}
        {loadingGet ? (
          <div>Loading data</div>
        ) : (
          <>
            {formData.length !== 0 ? (
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
                          value={formData.name}
                          type="text"
                          placeholder="Type product name here. . ."
                          name="ProductName"
                          updated={(_value) => {
                            setFormData({
                              ...formData,
                              name: _value,
                            });
                          }}
                        >
                          Product Name
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
                          value={formData.description}
                          size="w-full "
                          rows="4"
                          type="text"
                          placeholder="Type product description here. . ."
                          name="ProductDescription"
                          updated={(_value) => {
                            setFormData({
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
                          size="w-full"
                          type="text"
                          placeholder="Drag and drop image here, or click add image"
                          name="CategoryImage"
                          updated={(_value) => {
                            setImageArr((imageArr) => [...imageArr, _value]);

                            setFormData({
                              ...formData,
                              images: imageArr,
                            });
                          }}
                        >
                          Photo
                        </NormalInput>
                      </div>
                      <div className="mb-3 grid grid-cols-4 gap-2">
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
                          value={formData.price}
                          size="w-full"
                          type="number"
                          min="0"
                          name="ProductPrice"
                          updated={(_value) => {
                            setFormData({
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
                  {/* <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
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
                      placeholder="Type product quantity here. . ."
                      name="ProductQuantity"
                      updated={(_value) => {
                        setFormData({
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
            </div> */}
                </div>

                {/* category */}
                <div className="col-span-1">
                  <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
                    <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                      Category
                    </div>
                    <div>
                      <div className="mb-3">
                        {/* <NormalDropdown
                          placeholder="Select a category"
                          searchPlaceholder="Enter category name..."
                          value={formData.category}
                          isDisabled="true"
                        >
                          Product Category
                        </NormalDropdown> */}
                        <NormalInput
                          size="w-full"
                          type="text"
                          value={formData.categoryId}
                          isDisabled="true"
                        >
                          Product Category
                        </NormalInput>
                      </div>
                    </div>
                  </div>

                  {/* status */}
                  {/* <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
                <div className="flex justify-between">
                  <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                    Status
                  </div>
                  <ProductStatus status={formData.status} />
                </div>
                <div>
                  <div className="mb-3">
                    <NormalInput
                      size="w-full"
                      type="text"
                      value={formData.status}
                      name={`ProductStatus`}
                      isDisabled="true"
                    >
                      Product Status
                    </NormalInput>
                  </div>
                </div>
              </div> */}
                </div>
              </div>
            ) : (
              <div>Product does not exist</div>
            )}
          </>
        )}
      </div>
    </>
  );
}
