import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";

import { SnackBarContext } from "../../../contexts/SnackBarContext";

import { HiMiniXMark } from "react-icons/hi2";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import apis from "../../../apis";

import NormalInput from "../../../components/forms/NormalInput";
import NormalTextarea from "../../../components/forms/NormalTextarea";

const userSchema = object({
  name: string().required("Name không được để trống"),
  description: string()
    .required("Description không được để trống")
    .max(255, "Description phải ít hơn 255 ký tự"),
  image: string()
    .required("Image không được để trống")
    .url("Image phải là đường dẫn"),
});

export default function EditCategory() {
  // const [singleData, setSingleData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [errorsForm, setErrorsForm] = useState({});
  // thiết lập trạng thái Loading lấy data từ api
  const [loadingGet, setLoadingGet] = useState(false);
  // trạng thái Loading cập nhật data
  const [loadingPost, setLoadingPost] = useState(false);

  const { addSnack } = useContext(SnackBarContext);

  //1.
  const isSubmit = useRef(false);
  //2.
  const nameInput = useRef(null);
  const descInput = useRef(null);
  const imageInput = useRef(null);

  const params = useParams();
  let navigate = useNavigate();

  // load category data by id based on url parameter
  // then validate data and highlight with red border for each invalid input
  useEffect(() => {
    setLoadingGet(true);
    //set useRef flag when submit button is clicked
    isSubmit.current = true;

    apis.categories
      .getSingleData(params.id)
      .then(
        (res) => {
          const { category } = res.data.data;
          // xử lý categories nếu cần (Xử lý computed data)
          category.image = category.image || "";
          category.name = category.name || "";
          category.description = category.description || "";
          setFormData(category);
          setTimeout(() => {
            userSchema
              .validate(category, { abortEarly: false })
              .catch(function (err) {
                const errObj = {};
                err.inner.map((o) => {
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

  /**
   * Description
   *
   * Handle submit button to post formData of Category
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
        function (value) {
          console.log(value); // returns person object
          apis.categories
            .update(params.id, formData)
            .then(
              (res) => {
                // thành công
                addSnack("success", "Cập nhật Category thành công");
                console.log(`Update Category - ${params.id}`);
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
      .catch(function (err) {
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
        if ("image" in errObj) {
          imageInput.current.classList.add("border-red-500");
        } else {
          imageInput.current.classList.remove("border-red-500");
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
   * /categories/:id
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
              Edit Category
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
                <div className="col-span-1">
                  <div className="bg-white p-6 border border-neutral-100 rounded-lg">
                    <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                      Thumbnail
                    </div>
                    <div>
                      <div className="mb-3">
                        <NormalInput
                          reference={imageInput}
                          value={formData.image}
                          size="w-full"
                          type="text"
                          placeholder="Drag and drop image here, or click add image"
                          name="CategoryImage"
                          updated={(_value) => {
                            setFormData({
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
                            className="w-full h-[250px] object-cover"
                          />
                        ) : (
                          <>
                            {formData.image ? (
                              <img
                                src={formData.image}
                                alt=""
                                className="w-full h-[250px] object-cover"
                              />
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  {/* general information */}
                  <div className="bg-white p-6 border border-neutral-100 rounded-lg">
                    <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                      General Information
                    </div>
                    <div>
                      <div className="mb-3">
                        <NormalInput
                          reference={nameInput}
                          value={formData.name}
                          size="w-full"
                          type="text"
                          placeholder="Type category name here. . ."
                          name="Category Name"
                          updated={(_value) => {
                            setFormData({
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
                          value={formData.description}
                          size="w-full "
                          rows="6"
                          type="text"
                          placeholder="Type category description here. . ."
                          name="Category Description"
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
                </div>
              </div>
            ) : (
              <div>Category does not exist</div>
            )}
          </>
        )}
      </div>
    </>
  );
}
