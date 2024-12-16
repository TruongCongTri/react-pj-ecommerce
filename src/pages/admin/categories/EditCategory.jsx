import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HiMiniXMark } from "react-icons/hi2";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import apis from "../../../apis";

import FileUploader from "../../../components/forms/FileUploader";
import NormalInput from "../../../components/forms/NormalInput";
import NormalTextarea from "../../../components/forms/NormalTextarea";

export default function EditCategory() {
  const [singleData, setSingleData] = useState([]);
  const [loadingGet, setLoadingGet] = useState(false);

  const [idData, setIdData] = useState();
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
  useEffect(() => {
    setIdData(params.id);
  }, []);

  const submit = () => {
    apis.categories
      .update(idData, formData)
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

  const handleEditCate = () => {
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
            text="text-neutral-400 font-semibold text-sm"
            type="submit"
            icon={<HiMiniXMark />}
            iconStyle="size-5 "
            onClick={handleCancel}
            border="border border-neutral-400"
          >
            Cancel
          </NormalButton>
          <NormalButton
            color="bg-[#5C59E8]"
            text="text-white"
            border="border border-[#5C59E8]"
            type="submit"
            icon={<HiMiniWrenchScrewdriver />}
            iconStyle="size-5"
            onClick={handleEditCate}
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
            <FileUploader
              color="bg-white"
              border="border border-neutral-100"
              text="text-neutral-800 font-medium text-lg"
              labelText="text-neutral-600 font-medium text-sm"
              label="Photo"
              type="text"
              placeholder="Drag and drop image here, or click add image"
              value={singleData.image}
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
  );
}
