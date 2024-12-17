import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HiMiniXMark } from "react-icons/hi2";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import apis from "../../../apis";

import NormalInput from "../../../components/forms/NormalInput";
import NormalTextarea from "../../../components/forms/NormalTextarea";

export default function EditCategory() {
  const [singleData, setSingleData] = useState([]);
  const [loadingGet, setLoadingGet] = useState(false);

  const [formData, setformData] = useState({});
  const [loadingCreate, setLoadingCreate] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    setLoadingGet(true);
    apis.categories
      .getSingleData(params.id)
      .then(
        (res) => {
          const { category } = res.data.data;
          // xử lý categories nếu cần (Xử lý computed data)
          setSingleData(category);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setTimeout(() => {
          setLoadingGet(false);
        }, 1000);
      });
    return () => {};
  }, []);

  const params = useParams();

  const submit = () => {
    apis.categories
      .update(params.id, formData)
      .then(
        (res) => {
          // thành công
          navigate("/admin/categories");
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setLoadingCreate(false);
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
    navigate("/admin/categories");
  };

  return (
    <>
      {singleData.length !== 0 ? (
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
                iconStyle="size-5"
                icon={<HiMiniXMark />}
                type="submit"
                onClick={handleCancel}
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
              >
                Edit Category
              </NormalButton>
            </div>
          </div>
          {loadingGet ? (
            <div>Loading data</div>
          ) : (
            <div className="grid grid-cols-4 grid-rows-3 gap-5">
              <div className="col-span-1 row-span-2">
                <div className="bg-white p-6 border border-neutral-100 rounded-lg">
                  <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                    Thumbnail
                  </div>
                  <div>
                    <div className="mb-3">
                      <NormalInput
                        size="w-full"
                        type="text"
                        placeholder="Drag and drop image here, or click add image"
                        name="CategoryImage"
                        value={singleData.image}
                        updated={(_value) => {
                          setformData({
                            ...formData,
                            image: _value,
                          });
                        }}
                      >
                        Photo
                      </NormalInput>
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
                          {singleData.image ? (
                            <img
                              src={singleData.image}
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
              <div className="col-span-3 row-span-2.5">
                {/* general information */}
                <div className="bg-white p-6 border border-neutral-100 rounded-lg">
                  <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                    General Information
                  </div>
                  <div>
                    <div className="mb-3">
                      <NormalInput
                        size="w-full"
                        value={singleData.name}
                        type="text"
                        name={`CategoryName`}
                        updated={(_value) => {
                          setformData({
                            ...formData,
                            name: _value,
                          });
                        }}
                      >
                        Category Name
                      </NormalInput>
                    </div>
                    <div>
                      <NormalTextarea
                        size="w-full "
                        rows="6"
                        type="text"
                        value={singleData.description}
                        name={`CategoryDesc`}
                        updated={(_value) => {
                          setformData({
                            ...formData,
                            description: _value,
                          });
                        }}
                      >
                        Description
                      </NormalTextarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1>Category does not exist</h1>
      )}
    </>
  );
}
