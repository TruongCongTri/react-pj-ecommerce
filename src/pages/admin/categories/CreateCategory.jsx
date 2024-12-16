import React, { useState } from "react";
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
  const [loadingCreate, setLoadingCreate] = useState(false);

  let navigate = useNavigate();
  const submit = () => {
    apis.categories
      .create(formData)
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
  const handleUpdateFile = (img) => {
    setformData({
      ...formData,
      image: img,
    });
  };

  const handleAddCate = () => {
    submit();
  };
  const handleCancel = () => {
    navigate("/admin/categories");
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
            // size="min-w-[100px] max-w-[100px] min-h-10 max-h-10"
            type="submit"
            icon={<HiMiniXMark />}
            iconStyle="size-5 "
            onClick={handleCancel}
          >
            Cancel
          </NormalButton>

          <NormalButton
            color="bg-[#5C59E8]"
            text="text-white"
            border="border border-[#5C59E8]"
            // size="min-w-[147px] max-w-[147px] min-h-10 max-h-10"
            type="submit"
            icon={<HiMiniPlus />}
            iconStyle="size-5"
            onClick={handleAddCate}
          >
            Add Category
          </NormalButton>
        </div>
      </div>

      <div className="grid grid-cols-4 grid-rows-3 gap-5">
        <div className="col-span-1 row-span-2">
          <FileUploader
            color="bg-white"
            border="border border-neutral-100"
            text="text-neutral-800 font-medium text-lg"
            labelText="text-neutral-600 font-medium text-sm"
            label="Photo"
            type="text"
            placeholder="Drag and drop image here, or click add image"
            // updateFile={handleUpdateFile}

            updated={(_value) => {
              setformData({
                ...formData,
                image: _value,
              });
            }}
          >
            Thumbnail
          </FileUploader>
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
              </div>
              <div>
                <NormalTextarea
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
